const API = "http://localhost:5000/api";

/* ================================
   AUTH GUARD
================================ */
const token = localStorage.getItem("token");

if (
  !token &&
  !window.location.pathname.includes("login") &&
  !window.location.pathname.includes("register")
) {
  window.location.href = "login.html";
}

/* ================================
   REGISTER
================================ */
async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  alert(data.message || "Registered successfully!");
  window.location.href = "login.html";
}

/* ================================
   LOGIN
================================ */
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
}

/* ================================
   LOGOUT
================================ */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

/* ================================
   CREATE POST (WITH IMAGE)
================================ */
async function createPost() {
  const caption = document.getElementById("caption").value;
  const image = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("caption", caption);
  if (image) formData.append("image", image);

  await fetch(`${API}/post/create`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  document.getElementById("caption").value = "";
  document.getElementById("image").value = "";

  loadPosts();
}

/* ================================
   LOAD POSTS
================================ */
async function loadPosts() {
  const res = await fetch(`${API}/post/all`, {
    headers: { Authorization: token },
  });

  const posts = await res.json();
  const postsDiv = document.getElementById("posts");

  if (!postsDiv) return;

  postsDiv.innerHTML = "";

  posts.forEach((post) => {
    postsDiv.innerHTML += `
      <div class="card">
        <h3>@${post.user.username}</h3>
        <p>${post.caption}</p>

        ${
          post.image
            ? `<img src="http://localhost:5000/uploads/${post.image}" class="post-img">`
            : ""
        }

        <div style="margin-top:10px;">
          <button onclick="likePost('${post._id}')">
            ❤️ ${post.likes.length}
          </button>

          <button onclick="toggleComments('${post._id}')">
            💬 ${post.comments.length}
          </button>
        </div>

        <div id="comments-${post._id}" style="margin-top:10px; display:none;">
          <input 
            placeholder="Write a comment..." 
            onkeypress="if(event.key==='Enter') addComment('${post._id}', this.value)"
          >

          ${post.comments
            .map(
              (c) =>
                `<p><b>@${c.user.username}</b> ${c.text}</p>`
            )
            .join("")}
        </div>
      </div>
    `;
  });
}

/* ================================
   LIKE POST
================================ */
async function likePost(id) {
  await fetch(`${API}/post/like/${id}`, {
    method: "PUT",
    headers: { Authorization: token },
  });

  loadPosts();
}

/* ================================
   TOGGLE COMMENTS
================================ */
function toggleComments(id) {
  const div = document.getElementById(`comments-${id}`);
  div.style.display = div.style.display === "none" ? "block" : "none";
}

/* ================================
   ADD COMMENT
================================ */
async function addComment(postId, text) {
  if (!text) return;

  await fetch(`${API}/post/comment/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ text }),
  });

  loadPosts();
}

/* ================================
   LOAD PROFILE
================================ */
async function loadProfile() {
  const res = await fetch(`${API}/user/profile`, {
    headers: { Authorization: token },
  });

  const user = await res.json();

  const profileDiv = document.getElementById("profileData");
  if (!profileDiv) return;

  profileDiv.innerHTML = `
    <div class="card">
      <h2>@${user.username}</h2>
      <p>Followers: ${user.followers.length}</p>
      <p>Following: ${user.following.length}</p>
    </div>
  `;
}

/* ================================
   FOLLOW / UNFOLLOW
================================ */
async function followUser(userId) {
  await fetch(`${API}/user/follow/${userId}`, {
    method: "PUT",
    headers: { Authorization: token },
  });

  loadProfile();
}

/* ================================
   AUTO LOAD BASED ON PAGE
================================ */
if (window.location.pathname.includes("index.html")) {
  loadPosts();
}

if (window.location.pathname.includes("profile.html")) {
  loadProfile();
}