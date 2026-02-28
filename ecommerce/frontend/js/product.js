document.addEventListener("DOMContentLoaded", async function () {

  const productId = localStorage.getItem("selectedProduct");

  console.log("Product ID:", productId); // DEBUG

  if (!productId) {
    document.getElementById("product-details").innerHTML = "Product not found";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
    const product = await res.json();

    console.log("Fetched Product:", product); // DEBUG

    if (!product || product.message === "Product not found") {
      document.getElementById("product-details").innerHTML = "Product not found";
      return;
    }

    document.getElementById("product-details").innerHTML = `
      <div class="product-view">
        <img src="http://localhost:5000${product.image}" />
        <h2>${product.name}</h2>
        <p>₹${product.price}</p>
        <p>${product.description}</p>
        <p>Brand: ${product.brand}</p>
        <p>Rating: ⭐ ${product.rating}</p>
      </div>
    `;

  } catch (error) {
    console.error("Error loading product:", error);
    document.getElementById("product-details").innerHTML = "Error loading product";
  }
});