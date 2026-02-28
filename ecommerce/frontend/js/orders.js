document.addEventListener("DOMContentLoaded", function(){

  loadNavbar();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if(orders.length === 0){
    document.getElementById("order-list").innerHTML =
      "<h2>No orders yet</h2>";
    return;
  }

  const content = orders.map(order => {
    const product = products.find(p => p.id == order.productId);

    return `
      <div class="checkout-card" style="margin-bottom:20px;">
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Quantity:</strong> ${order.quantity}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>
        <p><strong>Date:</strong> ${order.date}</p>
      </div>
    `;
  }).join("");

  document.getElementById("order-list").innerHTML = `
    <h2>Your Orders</h2>
    <br>
    ${content}
  `;
});
