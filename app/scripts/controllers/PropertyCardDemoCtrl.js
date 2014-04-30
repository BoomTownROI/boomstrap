(function(boomstrap) {
  'use strict';
  boomstrap.controller('PropertyCardDemoCtrl', ['$scope', function PropertyCardDemoCtrl ($scope) {
    $scope.properties = [
        { // this would be populated from a service/API call
            // dummy data for the pattern library
            imageSrc: 'http://placebear.com/800/600',
            defaultImageSrc: 'http://placekitten.com/800/600',
            listPrice: '$2,250,000',
            listingUrl: 'https://www.google.com/search?q=quaint+shack&tbm=isch',
            offMarket: false, // only populated for off market listings (triggers sash)
            newProperty: '6 hrs ago', // only populated for new listings (triggers sash)
            reduced: false, // only populated for reductions (triggers sash)
            // reduced: {
            //     'when': '5 hrs ago',
            //     'change': '-$250,000',
            //     'changePercent': '2%'
            // },
            backOnMarket: false, // only populated for back on market (triggers sash)
            bestFits: '1444',
            favs: '33',
            mls: '1324961',
            listed: '6 days ago',
            pricePerSqft: '$1.99',
            beds: '5',
            baths: '3.5',
            sqft: '4,195',
            acres: '2.75',
            type: 'Frat House',

            address: {
                street: '123 Fourth St.',
                city: 'Charleston',
                state: 'SC',
                neighborhood: 'Craig\'s Landing'
            },

            history: [
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
            ]
        },
        {
            imageSrc: 'http://placekitten.com/800/600',
            defaultImageSrc: 'http://placebear.com/800/600',
            listPrice: '$1,500,000',
            listingUrl: 'https://www.google.com/search?q=quaint+shanty&tbm=isch',
            offMarket: false, // only populated for off market listings (triggers sash)
            newProperty: false, // only populated for new listings (triggers sash)
            reduced: {
                'when': '5 hrs ago',
                'change': '-$250,000',
                'changePercent': '5%'
            },
            backOnMarket: false, // only populated for back on market (triggers sash)
            bestFits: '991',
            favs: '21',
            mls: '1325961',
            listed: '11 days ago',
            pricePerSqft: '$3.99',
            beds: '4',
            baths: '3',
            sqft: '3,825',
            acres: '0.75',
            type: 'Crash Pad',

            address: {
                street: '321 Contact Pl.',
                city: 'Over Yonder',
                state: 'NY',
                neighborhood: 'Funk Crossing'
            },

            history: [
                {
                    'when': '5 hrs ago',
                    'change': '-$250,000',
                    'changePercent': '5%',
                    'price': '$1,500,000'
                },
                {
                    'when': '6 hrs ago',
                    'change': '-$1,000,000',
                    'changePercent': '10%',
                    'price': '$2,750,000'
                }
            ]
        }
    ];
  }]);
})(angular.module('boomstrap'));