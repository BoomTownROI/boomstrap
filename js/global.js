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
    $('[data-toggle="popover"]').popoverClosable();
});