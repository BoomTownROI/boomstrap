(function() {
  // configure momentjs langs to display relative time our way
  moment.lang('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s:  "1 sec",
        m:  "1 min",
        mm: "%d min",
        h:  "1 hr",
        hh: "%d hrs",
        d:  "1 day",
        dd: function(number) { // number is number of days
          // round to the closest number of weeks
          var weeks = Math.round(number / 7);
          if (number < 14) {
            // if less than a week, use days
            return number + " days";
          } else {
            // pluralize weeks
            return weeks + " wk" + (weeks === 1 ? "" : "s"); 
          }
        },
        M:  "1 mo",
        MM: "%d mos",
        y:  "1 yr",
        yy: "%d yrs"
    }
  });
})();