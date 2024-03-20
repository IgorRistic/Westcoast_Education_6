document.addEventListener("DOMContentLoaded", fetchCourses);

async function fetchCourses() {
  const response = await fetch(
    "http://127.0.0.1:5500/"
  );
  const courses = await response.json();
  displayCourses(courses);
}

function displayCourses(courses) {
  const mainElement = document.getElementById("showCourses");

  courses.forEach((course) => {
    const figure = document.createElement("figure");
    figure.id = course.id;

    const img = document.createElement("img");
    img.src = course.image;
    img.alt = `Image representing ${course.title}`;
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figure.appendChild(figcaption);

    const h2 = document.createElement("h2");
    h2.textContent = course.title;
    figcaption.appendChild(h2);

    const ul = document.createElement("ul");
    ul.className = "course-info";
    const liContent = `
      <div>
        <li>Course Number: ${course.courseNumber}</li>
        <li>Total Days: ${course.durationDays}</li>
        <li>Price: ${course.price} &euro;</li>
      </div>
    `;
    ul.innerHTML = liContent;
    figcaption.appendChild(ul);

    // Only show these buttons if the user is an admin
    if (sessionStorage.getItem("userRole") === "admin") {
      const editButton = document.createElement("button");
      editButton.className = "adminOnly cta";
      editButton.textContent = "Edit Course";
      editButton.addEventListener("click", function () {
        window.location.href = `edit-course.html?id=${course.id}`;
      });
      figcaption.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.className = "adminOnly cta";
      deleteButton.textContent = "Delete Course";
      deleteButton.onclick = () => deleteCourse(course.id);
      figcaption.appendChild(deleteButton);
    }

    const bookNowLink = document.createElement("button");
    bookNowLink.className = "cta";
    bookNowLink.textContent = "Book Now";
    bookNowLink.addEventListener("click", function () {
      bookCourse(course.id);
    });
    figcaption.appendChild(bookNowLink);

    mainElement.appendChild(figure);
    mainElement.appendChild(document.createElement("hr"));
  });
}

function displayAdminButtons() {
  const userRole = sessionStorage.getItem("userRole");
  if (userRole !== "admin") {
    document.querySelectorAll(".adminOnly").forEach((element) => {
      element.style.display = "none";
    });
  }
}

async function deleteCourse(courseId) {
  try {
    // Send DELETE request to server
    const response = await fetch(
      `http://127.0.0.1:5500/${courseId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete the course with ID: ${courseId}`);
    }

    // If successful, remove the course element from the DOM or refresh the courses
    alert("Course deleted successfully.");
    window.location.href = "courses.html";
  } catch (error) {
    console.error("Error deleting course:", error);
    alert(`Failed to delete course: ${error.message}`);
  }
}

function bookCourse(courseId) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // If logged in, redirect to purchase form with course ID in query string
    window.location.href = `purchase-form.html?courseId=${courseId}`;
  } else {
    // If not logged in, show an alert
    alert("You must log in first to book a course.");
  }
}

displayAdminButtons();
