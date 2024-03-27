// destory the token in local storage for sign out and redirect to login page
// Get the sign out link element
const signOutLink = document.getElementById("signout");

// Add an event listener to the sign out link
signOutLink.addEventListener("click", () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    window.location.href = "../auth/login.html";
});
