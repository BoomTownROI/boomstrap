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
      name: 'qual',
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
      name: 'nurt',
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
      name: 'pend',
      abbr: 'pend',
      active: false
    },
    {
      value: 10,
      name: 'close',
      abbr: 'close',
      active: false
    },
    {
      value: 6,
      name: 'arch',
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
