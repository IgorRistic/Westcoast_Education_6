async function fetchBookings() {
  const response = await fetch(
    "http://127.0.0.1:5500/"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
}

function displayBookings(bookings) {
  const bookingsList = document.getElementById("bookingsList");
  bookings.forEach((booking) => {
    const bookingDiv = document.createElement("div");
    bookingDiv.innerHTML = `
            <p>Course ID: ${booking.courseId}</p>
            <p>Username: ${booking.username}</p>
            <p>Email: ${booking.email}</p>
            <p>Phone: ${booking.phone}</p>
            <hr>
        `;
    bookingsList.appendChild(bookingDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const bookings = await fetchBookings();
    displayBookings(bookings);
  } catch (error) {
    console.error("Error loading bookings:", error);
    // Display an error message or handle errors appropriately
  }
});

if (sessionStorage.getItem("userRole") !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "index.html"; // Redirect to a safe page
}
