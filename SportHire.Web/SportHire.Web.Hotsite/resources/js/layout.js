document.addEventListener("DOMContentLoaded", function() {
  const menuIcon = document.querySelector(".mobile-menu-icon");
  const menu = document.querySelector(".desktop-navbar-ul");

  menuIcon.addEventListener("click", function(event) {
    event.preventDefault();  
    menu.classList.toggle("active-nav"); 
  });
});