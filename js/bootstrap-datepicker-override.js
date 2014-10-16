(function($) {
  // A datepicker is already defined in other systems more than likely
  // Restore that functionality and re-assign this one
  var datepicker    = $.fn.datepicker.noConflict(); // return $.fn.datepicker to previously assigned value
  $.fn.bsDatepicker = datepicker;                   // give $().bsDatepicker the bootstrap-datepicker functionality
})(window.jQuery);