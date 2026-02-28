let products = [];

// ================= FETCH PRODUCTS FROM BACKEND =================
async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    products = await res.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(productList) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = productList.map(product => `
  <div class="product-card">
    <img src="http://localhost:5000${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">₹${product.price}</p>
    <div class="product-actions">
      <button class="btn-secondary" onclick="viewProduct('${product._id}')">View</button>
      <button class="btn-primary" onclick="addToCart('${product._id}')">Add</button>
    </div>
  </div>
`).join('');
}

// ================= VIEW PRODUCT =================
function viewProduct(id){
  localStorage.setItem("selectedProduct", id.toString());
  window.location.href = "product.html";
}

// ================= ADD TO CART =================
async function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Please login first");
    return;
  }

  await fetch("http://localhost:5000/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user._id,
      productId: productId,
      quantity: 1
    })
  });

  showToast("Product added to cart");
  loadCartCount(); // reload real count
}
async function loadCartCount() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;

  const res = await fetch(`http://localhost:5000/api/cart/${user._id}`);
  const cart = await res.json();

  const cartCount = document.getElementById("cart-count");

  if (cart && cart.items) {
    cartCount.innerText = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  } else {
    cartCount.innerText = 0;
  }
}
// ================= UPDATE CART COUNT =================
function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if(cartCount) cartCount.innerText = cart.length;
}

// ================= SEARCH =================
function searchProducts(query){
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  displayProducts(filtered);
}

// ================= TOAST =================
function showToast(message){
  const toast = document.getElementById("toast");
  if(!toast) return;

  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(()=> toast.classList.remove("show"), 2000);
}

// ================= NAVBAR =================
function loadNavbar(){
  const nav = document.getElementById("nav-links");
  if(!nav) return;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if(user){
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="cart.html">Cart <span class="cart-count" id="cart-count">0</span></a>
      <a href="#">👤 ${user.name}</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="cart.html">Cart <span class="cart-count" id="cart-count">0</span></a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }

  updateCartCount();
}

function logout(){
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// ================= PAGE LOAD =================
document.addEventListener("DOMContentLoaded", function(){
  fetchProducts();  // 🔥 Now loads from backend
  loadNavbar();
  updateCartCount();
});
async function loadCheckout() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;

  const res = await fetch(`http://localhost:5000/api/cart/${user._id}`);
  const cart = await res.json();

  const container = document.getElementById("checkout-items");
  if (!container) return;

  let total = 0;

  container.innerHTML = cart.items.map(item => {
    total += item.product.price * item.quantity;

    return `
      <div>
        <h4>${item.product.name}</h4>
        <p>₹${item.product.price} × ${item.quantity}</p>
      </div>
    `;
  }).join("");

  document.getElementById("checkout-total").innerText = "Total: ₹" + total;

  localStorage.setItem("checkoutTotal", total);
}
async function placeOrder() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const totalPrice = localStorage.getItem("checkoutTotal");

  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  const cartRes = await fetch(`http://localhost:5000/api/cart/${user._id}`);
  const cart = await cartRes.json();

  await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user._id,
      products: cart.items.map(i => ({
        product: i.product._id,
        quantity: i.quantity
      })),
      totalPrice,
      paymentMethod
    })
  });

  // clear cart
  await fetch("http://localhost:5000/api/cart/clear", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId: user._id })
  });
async function loadOrders() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;

  const res = await fetch(
    `http://localhost:5000/api/orders/${user._id}`
  );

  const orders = await res.json();

  const container = document.getElementById("order-list");
  if (!container) return;

  container.innerHTML = orders.map(order => `
    <div>
      <h4>Order ID: ${order._id}</h4>
      <p>Total: ₹${order.totalPrice}</p>
      <p>Payment: ${order.paymentMethod}</p>
      <p>Status: ${order.status || "Placed"}</p>
      <hr>
    </div>
  `).join("");
}
  window.location.href = "success.html";
}