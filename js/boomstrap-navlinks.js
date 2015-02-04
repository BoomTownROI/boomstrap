/*
Boomstrap Navigation Links and Navigation Link Blocks
*
*/

(function($) {
  $.fn.btNavLinks = function() {

    // render and transform marker line
    var handleNavLinksBar = function($navLinks) {
      //  passed by the click event or fire on init
      var $nav = $(this);
      if (!$nav.hasClass('nav-links-init')) { // not inited yet
        $nav.addClass('nav-links-init');
        $nav.append('<span class="nav-links__bar"></span>');
      }
      var activeLink = $nav.find('li.active');
      var navLinksBar = $nav.find('.nav-links__bar');
      
      // render bar
      if ($nav.hasClass('nav-links')) { // horizontal
        navLinksBar.css({
          transform: 'translateX(' + activeLink.position().left + 'px)',
          width: activeLink.width()
        });
      } else if ($nav.hasClass('nav-blocks')) { // vertical
        navLinksBar.css({
          transform: 'translateY(' + activeLink.position().top + 'px)',
          height: activeLink.height()
        });
      }
    }

    // click handler
    var handleNavLinksClick = function(e) {
      e.preventDefault();
      if (!$(e.target).is('a')) {
        return; // only allow clicks on 'a' tag (prevents clicks on extra space in nav from erroring)
      }
      // climb up to nav level
      var $navLinks = $(this).closest($('.nav-links-init'));
      // kill old active
      $navLinks.find('li').removeClass('active');
      // add new active
      var activeLink = $(e.target).closest($('li'));
      activeLink.addClass('active');
      // re-render bar
      handleNavLinksBar.call(this, $navLinks);
    };

    // initialize
    handleNavLinksBar.apply(this);

    // set up event
    this.on('click', handleNavLinksClick);

    return this;

  };
})(jQuery);
