(function(boomstrap) {
  'use strict';
  boomstrap.controller('PropertyCardDemoCtrl', ['$scope', function PropertyCardDemoCtrl ($scope) {
    $scope.property = {}; // this would be populated from a service/API call in the wild

    // dummy data for the pattern library
    $scope.property.imageSrc = 'http://placebear.com/800/600';
    $scope.property.defaultImageSrc = 'http://placekitten.com/800/600';
    $scope.property.listPrice = '$2,250,000';
    $scope.property.listingUrl = 'https://www.google.com/search?q=quaint+shack&tbm=isch';
    $scope.property.offMarket = false; // only populated for off market listings (triggers sash)
    $scope.property.newProperty = '6 hours ago'; // only populated for new listings (triggers sash)
    $scope.property.reduced = false; // only populated for reductions (triggers sash)
    // $scope.property.reduced = {
    //     'when': '5 hrs ago',
    //     'change': '-$250,000',
    //     'changePercent': '2%',
    //     'price': '$2,250,000'
    // }
    $scope.property.backOnMarket = false; // only populated for back on market (triggers sash)
    $scope.property.bestFits = '1444';
    $scope.property.favs = '33';
    $scope.property.mls = '1324961';
    $scope.property.listed = '6 months ago';
    $scope.property.pricePerSqft = '$1.99';
    $scope.property.beds = '5';
    $scope.property.baths = '3.5';
    $scope.property.sqft = '4,195';
    $scope.property.acres = '2.75';
    $scope.property.type = 'Frat House';

    $scope.property.address = {};
    $scope.property.address.street = '123 Fourth St.';
    $scope.property.address.city = 'Charleston';
    $scope.property.address.state = 'SC';
    $scope.property.address.neighborhood = 'Craig\'s Landing';

    $scope.property.history = [
        {
            'when': '5 hrs ago',
            'change': '-$250,000',
            'changePercent': '2%',
            'price': '$2,250,000'
        },
        {
            'when': '6 weeks ago',
            'change': '-$500,000',
            'changePercent': '5%',
            'price': '$2,500,000'
        }
    ];
  }]);
})(angular.module('boomstrap'));