/*
Boomstrap Navigation Links and Navigation Link Blocks
*
*/

(function($) {
  $.fn.btNavLinks = function() {

    var handleNavLinksBar = function($navLinks) {
      var $nav = $navLinks || $(this);
      if (!$nav.hasClass('nav-links-initialized')) {
        $nav.addClass('nav-links-initialized');
        $nav.append('<span class="nav-links__bar"></span>');
      }
      var activeLink = $nav.find('li.active');
      var navLinksBar = $nav.find('.nav-links__bar');
      navLinksBar.css({
        transform: 'translateX(' + activeLink.position().left + 'px)',
        width: activeLink.width()
      });
    }

    // Handle click behavior
    var handleNavLinksClick = function(e) {
      e.preventDefault();
      var $navLinks = $(this).closest($('.nav-links'));
      $navLinks.find('li').removeClass('active');
      var activeLink = $(e.target).closest($('li'));
      activeLink.addClass('active');
      handleNavLinksBar.call(this, $navLinks);
    };

    this.each(function() {
      // make adjustments to nav links bar
      handleNavLinksBar.apply(this);
    });

    $(document).on('click', '.nav-links > li > a', handleNavLinksClick);

    return this;

  };
})(jQuery);

(function($) {
  $.fn.btNavBlocks = function() {

    var handleNavLinksBar = function($navLinks) {
      var $nav = $navLinks || $(this);
      if (!$nav.hasClass('nav-blocks-initialized')) {
        $nav.addClass('nav-blocks-initialized');
        $nav.append('<span class="nav-blocks__bar"></span>');
      }
      var activeLink = $nav.find('li.active');
      var navLinksBar = $nav.find('.nav-blocks__bar');
      navLinksBar.css({
        transform: 'translateY(' + activeLink.position().top + 'px)',
        height: activeLink.height()
      });
    }

    // Handle click behavior
    var handleNavLinksClick = function(e) {
      e.preventDefault();
      var $navLinks = $(this).closest($('.nav-blocks'));
      $navLinks.find('li').removeClass('active');
      var activeLink = $(e.target).closest($('li'));
      activeLink.addClass('active');
      handleNavLinksBar.call(this, $navLinks);
    };

    this.each(function() {
      // make adjustments to nav links bar
      handleNavLinksBar.apply(this);
    });

    $(document).on('click', '.nav-blocks-initialized > li > a', handleNavLinksClick);

    return this;

  };
})(jQuery);
