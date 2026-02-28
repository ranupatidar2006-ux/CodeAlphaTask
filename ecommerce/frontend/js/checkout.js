document.addEventListener("DOMContentLoaded", function(){

  loadNavbar();

  const orderData = JSON.parse(localStorage.getItem("buyNowOrder"));

  if(!orderData){
    document.getElementById("checkout-container").innerHTML =
      "<h2>No product selected</h2>";
    return;
  }

  const product = products.find(p => p.id == orderData.productId);
  const total = product.price * orderData.quantity;

  document.getElementById("checkout-container").innerHTML = `
    <div class="checkout-card">
      <h2>Checkout</h2>

      <div class="order-summary">
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Quantity:</strong> ${orderData.quantity}</p>
        <p><strong>Total:</strong> ₹${total}</p>
      </div>

      <h3>Shipping Details</h3>
      <input type="text" id="fullName" placeholder="Full Name" required>
      <input type="text" id="address" placeholder="Shipping Address" required>
      <input type="text" id="city" placeholder="City" required>
      <input type="text" id="pincode" placeholder="Pincode" required>

      <h3>Payment Method</h3>

      <div class="payment-methods">
        <button class="btn-secondary" onclick="selectPayment('upi')">UPI</button>
        <button class="btn-secondary" onclick="selectPayment('card')">Card</button>
      </div>

      <div id="payment-section"></div>

      <button class="btn-primary" style="margin-top:20px;" onclick="processPayment(${product.id}, ${orderData.quantity}, ${total})">
        Pay ₹${total}
      </button>
    </div>
  `;
});

function selectPayment(method){
  const section = document.getElementById("payment-section");

  if(method === "upi"){
    section.innerHTML = `
      <div class="payment-box">
        <input type="text" id="upiId" placeholder="Enter UPI ID (example@upi)">
      </div>
    `;
  }

  if(method === "card"){
    section.innerHTML = `
      <div class="payment-box">
        <input type="text" id="cardNumber" placeholder="Card Number">
        <input type="text" placeholder="Expiry (MM/YY)">
        <input type="text" placeholder="CVV">
      </div>
    `;
  }
}

function processPayment(productId, quantity, total){

  const name = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;

  if(name === "" || address === ""){
    alert("Please fill shipping details");
    return;
  }

  const order = {
    id: Date.now(),
    productId,
    quantity,
    total,
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("buyNowOrder");

  window.location.href = "success.html";
}
