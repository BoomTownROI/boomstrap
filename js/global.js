/* GLOBAL JS */


// Extend Bootstrap popover.js to add close button (http://jsfiddle.net/ConstantA/T3Xxh/)

$.fn.extend({
    popoverClosable: function (options) {
        var defaults = {
            template:
                '<div class="popover">\
<div class="arrow"></div>\
<div class="popover-close" data-dismiss="popover" aria-hidden="true"><i class="ficon ficon-cross" data-role="end"></i></div>\
<h3 class="popover-title"></h3>\
<div class="popover-content"></div>\
</div>'
        };
        options = $.extend({}, defaults, options);
        var $popover_togglers = this;
        $popover_togglers.popover(options);
        $popover_togglers.on('click', function (e) {
            e.preventDefault();
            $popover_togglers.not(this).popover('hide');
        });
        $('html').on('click', '[data-dismiss="popover"]', function (e) {
            $popover_togglers.popover('hide');
        });
    }
});

$(function () {
    var popovers = $('[data-toggle="popover"]');
    if (popovers) {
      popovers.popoverClosable();
    }
});

// Fix Bootstrap Issues

// There is a compatibility issue with Bootstrap and Prototype
// per this: http://stackoverflow.com/questions/15087129/popover-hides-parent-element-if-used-with-prototype-js

// The following code is the Tooltip hide function without specific events triggered
// The commented out code is the code that has changed

(function($) {
  $.fn.tooltip.Constructor.prototype.hide = $.fn.popover.Constructor.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    //var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    //this.$element.trigger(e)

    //if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }
})(window.jQuery);



// Set up element queries (BoomQuery - https://github.com/BoomTownROI/boomqueries)

window.boomQueries.add("texting", {
  selector: ".texting",
  breaks: [
    [610, "texting--md"]
  ]
});
window.boomQueries.add("log-call", {
  selector: ".log-call",
  breaks: [
    [420, "log-call--sm"]
  ]
});
window.boomQueries.add("set-to-do", {
  selector: ".set-to-do",
  breaks: [
    [420, "set-to-do--sm"]
  ]
});
window.boomQueries.calculate();






