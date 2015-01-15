/*
Boomstrap Navigation Links
This obviously needs to be rewritten as a plug-in or something (CA)
*/



// Handle click behavior
function handleNavLinksClick(evt) {
  evt.preventDefault()
  var navLinks = $(evt.target).closest($(".nav-links"));
  navLinks.find("li").removeClass("active");
  var activeLink = $(evt.target).closest($("li"));
  activeLink.addClass("active");
  handleNavLinksBar(navLinks);
}


// Adjust nav links bar accordingly
function handleNavLinksBar(target) {
  var activeLink = target.find($("li.active"));
  var navLinksBar = target.find($(".nav-links__bar"));
  navLinksBar.css({
   transform: 'translateX(' + activeLink.position().left + 'px)',
   width: activeLink.width()
  })
}

// Loop through and handle nav links bar for each instance
function initNavLinks() {
  var navLinks = document.querySelectorAll(".nav-links");
  for (var i=0;i<navLinks.length;i++){
    handleNavLinksBar($(navLinks[i]));
  }
}

$(document).on("click",".nav-links > li > a",handleNavLinksClick);

$(document).ready(function(){
  initNavLinks();
});





