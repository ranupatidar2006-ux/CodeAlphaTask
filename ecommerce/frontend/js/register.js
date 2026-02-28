// Show/Hide Password
function toggleRegPassword() {
  const pass = document.getElementById("regPassword");
  pass.type = pass.type === "password" ? "text" : "password";
}

// Form Validation
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if(name === "" || email === "" || password === "" || confirmPassword === ""){
    alert("Please fill all fields");
    return;
  }

  if(password.length < 6){
    alert("Password must be at least 6 characters");
    return;
  }

  if(password !== confirmPassword){
    alert("Passwords do not match ❌");
    return;
  }

  alert("Registration Successful 🎉");
  window.location.href = "login.html";
});
