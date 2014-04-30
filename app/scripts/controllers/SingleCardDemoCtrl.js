(function(boomstrap) {
  'use strict';
  boomstrap.controller('SingleCardDemoCtrl', ['$scope', function SingleCardDemoCtrl ($scope) {
    $scope.property = {}; // this would normally be populated from a service/API call

    // the following can be specified individually or via object notation {}
    $scope.property.imageSrc = 'http://lorempixel.com/output/animals-q-g-800-600-3.jpg';
    $scope.property.defaultImageSrc = 'http://placekitten.com/800/600';
    $scope.property.listPrice = '$2,250,000';
    $scope.property.listingUrl = 'https://www.google.com/search?q=quaint+outhouse&tbm=isch';
    $scope.property.backOnMarket = '6 hrs ago'; // only populated for new listings (triggers sash)
    $scope.property.bestFits = '1444';
    $scope.property.favs = '33';
    $scope.property.mls = '1324961';
    $scope.property.listed = '6 days ago';
    $scope.property.pricePerSqft = '$1.99';
    $scope.property.beds = '5';
    $scope.property.baths = '3.5';
    $scope.property.sqft = '4,195';
    $scope.property.acres = '2.75';
    $scope.property.type = 'Frat House';
    $scope.property.address = {
        street: '123 Fourth St.',
        city: 'Charleston',
        state: 'SC',
        neighborhood: 'Craig\'s Landing'
    };
    $scope.property.history = [
        {
            'when': '5 hrs ago',
            'change': '-$250,000',
            'changePercent': '2%',
            'price': '$2,250,000'
        },
        {
            'when': '6 hrs ago',
            'change': '-$500,000',
            'changePercent': '5%',
            'price': '$2,500,000'
        }
    ];
  }]);
})(angular.module('boomstrap'));