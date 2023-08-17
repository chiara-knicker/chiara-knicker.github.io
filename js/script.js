// Set color scheme
var colorScheme = "default"; 
document.documentElement.setAttribute("color-scheme", colorScheme);

// Define common elements
document.getElementById("myHead").innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap">
    <script src="/js/script.js"></script>

    <title>Chiara Knicker Portfolio</title>
  `
var myHeader = `
    <nav class="navbar">
      <a href="/index.html" class="name">ChiaraKnicker.</a>
      <a class="nav-icon" onclick="showNavDropdown()">
        <i class="fa fa-bars icon"></i>
      </a>
      <ul class="nav-links" id="navLinks">
        <li><a href="/resume.html">Resume</a></li>
        <li><a href="/portfolio.html">Projects</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
  `
var myFooter = `
    <div class="footer-container">
    <div class="footer-info">
      <p>Chiara Knicker</p>
      <p>Edinburgh, United Kingdom</p>
    </div>
    <div class="footer-social">
      <a href="https://linkedin.com/in/chiara-knicker" target="_blank"><i class="fa fa-linkedin icon"></i></a>
      <a href="https://github.com/chiara-knicker" target="_blank"><i class="fa fa-github"></i></a>
      <!-- Add more social media icons as needed -->
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="currentYear"></span> Chiara Knicker.</span>
      <span>This work is licensed under the <a href="https://github.com/chiara-knicker/chiara-knicker.github.io/blob/main/LICENSE" target="_blank" id="license-link">MIT License</a>.</span>
    </div>
    <div class="color-scheme-dropdown">
      <button class="dropdown-button" onclick="toggleColorScheme()">Toggle Color Scheme <i class="fa fa-chevron-down"></i></button>
      <ul class="dropdown-menu" id="colorSchemeOptions">
        <li onclick="setColorScheme('default')">Default</li>
        <li onclick="setColorScheme('lightgrey-blue')">Light Grey-Blue</li>
        <li onclick="setColorScheme('purple')">Purple</li>
      </ul>
    </div>
    </div>
  `
// Show navbar dropdown (for small screen sizes)
function showNavDropdown() {
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

// Make header disappear and reappear when scrolling down/up
var prevScrollPos = window.scrollY;

window.addEventListener("scroll", function () {
  var currentScrollPos = window.scrollY;

  if (currentScrollPos <= 0) { // some devices have a "bounce-back" effect when scrolling all the way up
    document.querySelector("header").classList.remove("header-hidden");
  } else if (prevScrollPos > currentScrollPos) {
    document.querySelector("header").classList.remove("header-hidden");
  } else {
    document.querySelector("header").classList.add("header-hidden");
    if (navLinks.classList.contains("active")) {
      showNavDropdown();
    }
    //navLinks.classList.remove("active"); // Close the dropdown when scrolling down
  }

  prevScrollPos = currentScrollPos;
});

// Filter functionality for Portfolio
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

// Add current year in footer
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
});

// Changing color scheme fuctionality (temporary)
function toggleColorScheme() {
  var dropdownMenu = document.getElementById("colorSchemeOptions");
  var dropdownButton = document.querySelector(".dropdown-button");

  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";
    dropdownMenu.scrollIntoView({ behavior: "smooth", block: "end" });
  } else {
    dropdownMenu.style.display = "none";
  }

  dropdownButton.classList.toggle("open");
}

function setColorScheme(scheme) {
  document.documentElement.setAttribute("color-scheme", scheme);
}