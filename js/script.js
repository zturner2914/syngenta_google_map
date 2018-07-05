$(function () {


    //on page load determine which header content to show
    if (window.location.href.indexOf("producer") > -1) {
        $('.producers-copy-holder').show();
    } else {
        $('.grower-copy-holder').show();
    }


    //map and list buttons functionality
    var $contents = $('.target-map');
    $contents.slice(1).hide();

    $('.tab').click(function () {
        $('.map-btns-wrap > a').removeClass('map-active');
        $(this).addClass('map-active');
        var $target = $('#' + this.id + 'show').show();
        $contents.not($target).hide();
    });

    // Map list accordian
    $('.map-state').click(function (e) {
        e.preventDefault();
        var selectedTab = $(this);
        if (selectedTab.parent().hasClass('open')) {
            selectedTab.parent().removeClass('open');
        } else {
            selectedTab.parent().addClass('open');
        }
    });


    //Expand All
    $('.expand-all').click(function () {
        var $this = $(this);

        if ($this.hasClass('active')) {
          $('.map-list-label').removeClass('open');
        } else {
            $('.map-list-label').addClass('open');
        }
        $this.toggleClass('active');

        if ($('.map-list-label').hasClass('open')) {
            $this.text('Collapse All (31)');
        } else {
            $this.text('Expand All (31)');
        }
    });

    //Make JSON from state info list
    var mapJson = [];

    $('.state-info').each(function (key, data) {

        var long = $(this).attr('data-long');
        var lat = $(this).attr('data-lat');
        var title = $(this).children('.zero-padding').children('.state-title').text();
        var address1 = $(this).children('.zero-padding').children('.address1').text();
        var address2 = $(this).children('.zero-padding').children('.address2').text();
        var phone = $(this).children('.zero-padding').children('.phone').text();

        mapJson.push({
            lat: lat,
            long: long,
            title: title,
            address1: address1,
            address2: address2,
            phone: phone
            });
    });

    var map;
    var marker;

    //google map api
    var initMap = function () {

        //create new map
        map = new google.maps.Map(document.getElementById('enogen-google-map1show'), {
            zoom: 8,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            styles: [{ "featureType": "administrative.province", "elementType": "labels.icon", "stylers": [{ "color": "#bfe6f0" }] }, { "featureType": "administrative.province", "elementType": "labels.text", "stylers": [{ "color": "#82b1bc" }, { "visibility": "simplified" }] }, { "featureType": "landscape.natural", "stylers": [{ "color": "#e9eceb" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#bebebe" }] }]
        });

        var infoWindow = new google.maps.InfoWindow();

        //markers
        var icon1 = 'images/greenpin.png';
        var icon2 = 'images/whitepin.png';


        //loop thru the json and add markers and infowindow to map
        for (var i = 0, length = mapJson.length; i < length; i++) {
            var data = mapJson[i],
                latLng = new google.maps.LatLng(data.lat, data.long);

            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.title,
                icon: icon1
            });

            (function (marker, data) {

                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function (e) {
                });

                // mouseover event for markers
                google.maps.event.addListener(marker, 'mouseover', function () {

                    var contentString = '<div class="contentString">' + '<h3 class="marker-name">' + data.title + '</h3>' + '<p class="marker-details">' + data.address1 + '</p>' + '<p class="marker-details">' + data.address2 + '</p>' + '<p class="marker-details">' + data.phone + '</p>' + '</div>';
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                    marker.setIcon(icon2);
                });

                // mouseout event for markers
                google.maps.event.addListener(marker, 'mouseout', function () {
                    marker.setIcon(icon1);
                    infoWindow.close();
                });
            })(marker, data);
        }

        //fitbounds
        var sw = new google.maps.LatLng(38.2673594, -104.6609083);
        var nw = new google.maps.LatLng(46.584537, -81.3593054);

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(sw);
        bounds.extend(nw);
        map.fitBounds(bounds);

    };
    initMap();
});
