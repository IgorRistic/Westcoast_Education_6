export async function fetchAccounts() {
  const response = await fetch(
    "http://127.0.0.1:5500/"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
}

export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Post request failed");
  }
  return response.json();
}

export function setSessionData(isLoggedIn, userRole) {
  sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
  sessionStorage.setItem("userRole", userRole);
}

// Changing log in button upon logging in.
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

// Toggle visibility based on login state
loginBtn.style.display = isLoggedIn === "true" ? "none" : "block";
logoutBtn.style.display = isLoggedIn === "true" ? "block" : "none";

logoutBtn.addEventListener("click", () => {
  sessionStorage.clear(); // Clears all sessionStorage, effectively logging the user out
});
