// Script for handling login form submission
document.getElementById("loginForm").onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission
  // Add your login logic here
  console.log("Form submitted");
  // Example login logic:
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(username);
  console.log(password);
};

//   // Example: Send credentials to the server
//   fetch("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         // Redirect to admin dashboard or any other action on success
//         window.location.href = "/admin/dashboard";
//       } else {
//         alert("Login failed");
//       }
//     })
//     .catch((err) => console.error("Login error:", err));
// };
