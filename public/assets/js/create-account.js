import { fetchAccounts, postData } from "./main.js";

document
  .querySelector("#create-account-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const accounts = await fetchAccounts();
      const emailExists = accounts.some((account) => account.email === email);
      if (emailExists) {
        throw new Error("Email already registered");
      }

      await postData(
        "http://127.0.0.1:5500/",
        { email, password }
      );
      alert("Account created successfully!");
      window.location.href = "/login.html";
    } catch (error) {
      alert("Failed to create account. Error: " + error.message);
    }
  });
