// Function to fetch course data
async function fetchCourseData(courseId) {
  const response = await fetch(
    `http://127.0.0.1:5500/${courseId}`
  );
  const course = await response.json();
  return course;
}

// Function to fill the form with course data
function fillFormWithCourseData(course) {
  document.getElementById("courseId").value = course.id;
  document.getElementById("title").value = course.title;
  document.getElementById("courseNumber").value = course.courseNumber;
  document.getElementById("durationDays").value = course.durationDays;
  document.getElementById("price").value = course.price;
  document.getElementById("image").value = course.image;
}

// Extract course ID from URL
const queryParams = new URLSearchParams(window.location.search);
const courseId = queryParams.get("id");

if (courseId) {
  fetchCourseData(courseId).then(fillFormWithCourseData);
}

document
  .getElementById("editCourseForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const courseId = document.getElementById("courseId").value;
    const updatedCourseData = {
      title: document.getElementById("title").value,
      courseNumber: document.getElementById("courseNumber").value,
      durationDays: document.getElementById("durationDays").value,
      price: document.getElementById("price").value,
      image: document.getElementById("image").value,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:5500/${courseId}`,
        {
          method: "PUT", // Use PUT to update the entire resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourseData),
        }
      );

      if (!response.ok) throw new Error("Failed to update course");

      alert("Course updated successfully!");
      window.location.href = "courses.html"; // Redirect to courses page
    } catch (error) {
      console.error("Failed to update course:", error);
      alert("Failed to update course. Please try again.");
    }
  });
