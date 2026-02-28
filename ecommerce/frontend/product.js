const productId = localStorage.getItem("selectedProduct");

async function loadProduct() {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
    const product = await res.json();

    const container = document.getElementById("product-details");

    container.innerHTML = `
      <div class="product-detail-card">
        <img src="http://localhost:5000${product.image}" />
        <div class="product-info">
          <h2>${product.name}</h2>
          <p class="price">₹${product.price}</p>
          <p>${product.description}</p>
          <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
          <p><strong>Stock:</strong> ${product.countInStock}</p>
          <button class="btn-primary" onclick="addToCart('${product._id}')">Add to Cart</button>
          <button class="btn-buy" onclick="buyNow('${product._id}')">Buy Now</button>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error loading product", err);
  }
}

function buyNow(id){
  localStorage.setItem("cart", JSON.stringify([id]));
  window.location.href = "checkout.html";
}

loadProduct();