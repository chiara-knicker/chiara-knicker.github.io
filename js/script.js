function myFunction() {
    var navLinks = document.getElementById("navLinks");
    var navIcon = document.querySelector(".nav-icon i");
    navLinks.classList.toggle("active");
    
    if (navLinks.classList.contains("active")) {
        navIcon.classList.remove("fa-bars");
        navIcon.classList.add("fa-times");
    } else {
        navIcon.classList.remove("fa-times");
        navIcon.classList.add("fa-bars");
    }
}

// Read the query string parameters
const urlParams = new URLSearchParams(window.location.search);
const filters = urlParams.get('filter') ? urlParams.get('filter').split(',') : [];

// Apply the filter based on the query string parameter
function applyFilter() {
    var projects = document.querySelectorAll(".container");
    var checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
  
    projects.forEach(function (project) {
        isVisible = filters.length === 0
        project.classList.forEach(function (projectArea) {
            if (filters.includes(projectArea)) {
                isVisible = true;
            }
        });
        project.style.display = isVisible ? "block" : "none";
    });

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = filters.includes(checkbox.value);
    });
}
  
// Call the applyFilter function when the page loads
window.addEventListener("load", applyFilter);

// Function called each time a checkbox is clicked
function filterProjects() {
    var checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
    var selectedAreas = Array.from(checkboxes)
      .filter(function (checkbox) {
        return checkbox.checked;
      })
      .map(function (checkbox) {
        return checkbox.value;
      });
  
    var projects = document.querySelectorAll(".container");

    projects.forEach(function (project) {
        var isVisible = selectedAreas.length === 0;
    
        project.classList.forEach(function (projectClass, index) {
          if (selectedAreas.includes(projectClass)) {
            isVisible = true;
          }
        });
    
        project.style.display = isVisible ? "block" : "none";
    });

    var filter = selectedAreas.length > 0 ? selectedAreas.join(',') : null;
    updateURL(filter);
}

function updateURL(filter) {
    var newURL = window.location.pathname + (filter ? '?filter=' + filter : '');
    window.history.pushState({ path: newURL }, '', newURL);
}