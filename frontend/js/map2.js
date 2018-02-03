var HQ = {
    19: {
        zoom: 19,
        x_min: 289893,
        x_max: 289895,
        y_min: 183199,
        y_max: 183200
    },
    20: {
        zoom: 20,
        x_min: 579787,
        x_max: 579790,
        y_min: 366398,
        y_max: 366400
    },
    21: {
        zoom: 21,
        x_min: null,
        x_max: null,
        y_min: null,
        y_max: null
    },
    22: {
        zoom: 22,
        x_min: null,
        x_max: null,
        y_min: null,
        y_max: null
    }
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43, lng: -22},
        zoom: 3,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['cxn']
        }
    });

    var cxnMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            if (isInRange(zoom, coord)) {
                //console.log("CUSTOM (x, y, z): ", coord.x, coord.y, zoom);
                return 'img/' + zoom + '/cxn_' + coord.x + '_' + coord.y + '_' + zoom + '.png';
            } else {
                return "http://mt.google.com/vt/lyrs=s&x=" + coord.x + "&y=" + coord.y + "&z=" + zoom
            }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 22,
        minZoom: 0,
        name: 'CXN World'
    });

    var coordsDiv = document.getElementById('coords');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener('mousemove', function(event) {
        coordsDiv.textContent =
            'lat: ' + event.latLng.lat() + ', ' +
            'lng: ' + event.latLng.lng() + ' (zoom: ' + map.getZoom() + ")";
    });


    var hqs = markerFromData("data/locations.json");
    setTimeout(function () {
        if(hqs.length > 0) {
            $.each(hqs, function (key, value) {
                value.setMap(map);
                value.setIcon({
                    url: "https://docs.chemaxon.com/download/attachments/41124491/docs?version=3&modificationDate=1473848922000&api=v2",
                    size: new google.maps.Size(200, 200),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(25, 25),
                    scaledSize: new google.maps.Size(50, 44)
                })
            })
        }
    }, 2000);

    var markers = markerFromData("data/teams.json");

    setTimeout(function () {
        if (markers.length > 0) {
            new MarkerClusterer(map, markers, {maxZoom: 18, imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"});
        }
    }, 5000);


    map.mapTypes.set('cxn', cxnMapType);
    map.setMapTypeId('cxn');
}

function markerFromData (source, map) {
    var result = [];
    $.getJSON(source, function (data) {
        $.each(data, function (key, value) {
            var marker = new google.maps.Marker(value);
            result.push(marker);
        })
    });

    return result;
}

function isInRange (zoom, coord) {
    var range = HQ[zoom];
    //console.info("size: ", calcRangeSize(zoom));
    return range &&
        range.x_min <= coord.x && coord.x <= range.x_max &&
        range.y_min <= coord.y && coord.y <= range.y_max
}

function calcRangeSize(zoom) {
    var range = HQ[zoom];
    if (!range) return null;
    return (range.x_max - range.x_min + 1) * (range.y_max - range.y_min + 1)
}