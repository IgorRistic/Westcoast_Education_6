import { fetchAccounts, setSessionData } from "./main.js";

document.getElementById("loginBtnAccount").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const accounts = await fetchAccounts();
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (user) {
      setSessionData(true, user.role);
      window.location.href = "index.html";
    } else {
      alert("Invalid login credentials");
    }
  } catch (error) {
    alert("Login failed. Please try again.");
  }
});
