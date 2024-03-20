document
  .getElementById("addCourseForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Capture form data
    const formData = {
      title: document.getElementById("title").value,
      courseNumber: document.getElementById("courseNumber").value,
      durationDays: document.getElementById("durationDays").value,
      price: document.getElementById("price").value,
      image: document.getElementById("image").value,
    };

    try {
      // POST request to add the course
      const response = await fetch(
        "http://127.0.0.1:5500/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to add course");

      // Redirect to courses page or display success message
      alert("Course added successfully!");
      window.location.href = "courses.html";
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Failed to add course. Please try again.");
    }
  });
