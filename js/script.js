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