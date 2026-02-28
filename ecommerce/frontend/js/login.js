// Show / Hide Password
function togglePassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
}

// Simple Validation
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "" || password === ""){
    alert("Please fill all fields");
    return;
  }

  if(password.length < 6){
    alert("Password must be at least 6 characters");
    return;
  }

  // Save user session
  const user = {
    email: email,
    name: email.split("@")[0]   // temporary username
  };

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Login Successful ✅");
  window.location.href = "index.html";
});
