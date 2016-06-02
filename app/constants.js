(function(Boomstrap) {
  'use strict';
  Boomstrap.constant('leadCategories', [  
    {
      value: 0,
      name: 'new',
      abbr: 'new',
      active: true
    },
    {
      value: 3,
      name: 'qualify',
      abbr: 'qual',
      active: true
    },
    {
      value: 5,
      name: 'hot',
      abbr: 'hot',
      active: true
    },
    {
      value: 4,
      name: 'nurture',
      abbr: 'nurt',
      active: true

    },
    {
      value: 2,
      name: 'watch',
      abbr: 'watch',
      active: true
    },
    {
      value: 11,
      name: 'pending',
      abbr: 'pend',
      active: false
    },
    {
      value: 10,
      name: 'closed',
      abbr: 'close',
      active: false
    },
    {
      value: 6,
      name: 'archive',
      abbr: 'arch',
      active: false
    },
    {
      value: 1,
      name: 'trash',
      abbr: 'trash',
      active: false
    }
  ]);
})(angular.module('boomstrap'));