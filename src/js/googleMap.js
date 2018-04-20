var mapModule = (function() {

  // Variables
  var position = {
      lat: -34.397,
      lng: 150.644
    },
    domMap = document.getElementById('map'),
    options = {
      center: position,
      scrollwheel: false,
      zoom: 16,
      styles: [{
          "featureType": "all",
          "stylers": [{
              "saturation": 0
            },
            {
              "hue": "#e7ecf0"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [{
            "saturation": -70
          }]
        },
        {
          "featureType": "transit",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "water",
          "stylers": [{
              "visibility": "simplified"
            },
            {
              "saturation": -60
            }
          ]
        }
      ],
    };

  // Methods
  var initMap = function() {
    // Creating Map
    var map = new google.maps.Map(domMap, options);

    // Creating empty Marker
    var marker = null;

    // Creating Info Window
    var infoContent =
      '<header>' +
      '<h6 class="map__header--above">Gabinet Stomatologiczny</h6>' +
      '<h5 class="map__header">John Doe</h5>' +
      '</header>' +
      '<address>' +
      '<p class="map__address">Swidnicka 1,</p>' +
      '<p class="map__address">50-031 Wroclaw, Polska</p>' +
      '</address>';
    var infowindow = new google.maps.InfoWindow({
      content: infoContent
    });

    // Creating Geocoder
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address': 'Świdnicka 1, 50-031 Wrocław'
    }, function(results, status) {
      if (status === 'OK') {

        // Centering map
        map.setCenter(results[0].geometry.location);
        // Filling Marker with data
        marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: 'img/map-marker.png',
        });
          infowindow.open(map, marker);
          // Adding Listener to Marker
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
      } else {
        alert('Geocode nie został załadowany z powodu: ' + status);
      }
    });


  };

  return {
    initMap: initMap
  }
})();
