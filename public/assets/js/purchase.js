document
  .getElementById("purchaseForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Extract user input from the form
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phoneNumber").value;

    // Assuming you're passing courseId in the query parameters to purchase-form.html
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("courseId");

    // Create the booking object
    const booking = {
      courseId,
      username,
      email,
      phone,
    };

    try {
      // Send the booking to the server
      const response = await fetch(
        "http://127.0.0.1:5500/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        }
      );

      if (!response.ok) throw new Error("Failed to create booking");

      alert("Thank you for your purchase!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to book the course. Please try again.");
    }
  });
