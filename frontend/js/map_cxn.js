var lobby = {lat: -1, lng: 18};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 1,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['cxn']
        }
    });

    var cxnMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            console.log(zoom);
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return 'img/cxn' +
                '_' + zoom + '_' + normalizedCoord.x + '_' +
                (bound - normalizedCoord.y - 1) + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 2,
        minZoom: 0,
        name: 'CXN'
    });

    var coordsDiv = document.getElementById('coords');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener('mousemove', function(event) {
        coordsDiv.textContent =
            'lat: ' + Math.round(event.latLng.lat()) + ', ' +
            'lng: ' + Math.round(event.latLng.lng());
    });


    var lobby = new google.maps.Marker({
        position: {lat: 10, lng: 15},
        title: "Lobby",
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        map: map
    });
    var diningroom = new google.maps.Marker({
        position: {lat: 10, lng: 65},
        title: "Dining Room",
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon45.png",
        map: map
    });

    var marvin = new google.maps.Marker({
        position: {lat: 20, lng: -30},
        title: "Marvin",
        map: map
    });
    var disco = new google.maps.Marker({
        position: {lat: 4, lng: -59},
        title: "Calculators & Discovery Tools",
        map: map
    });
    var chemicalize = new google.maps.Marker({
        position: {lat: -15, lng: -90},
        title: "Chemicalize",
        map: map
    })
    var jcb = new google.maps.Marker({
        position: {lat: -40, lng: -115},
        title: "JCB & Compliance Checker",
        map: map
    });
    var hr = new google.maps.Marker({
        position: {lat: -57, lng: -105},
        title: "Finance & People Engagement",
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon60.png",
        map: map
    });
    var blt = new google.maps.Marker({
        position: {lat: -55, lng: -55},
        title: "Business Line Team",
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon56.png",
        map: map
    });
    var jc4o = new google.maps.Marker({
        position: {lat: -35, lng: -5},
        title: "JChem for Office",
        map: map
    });
    var it = new google.maps.Marker({
        position: {lat: 45, lng: 20},
        title: "IT",
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon26.png",
        map: map
    });
    var synergy = new google.maps.Marker({
        position: {lat: 55, lng: 45},
        title: "ChemAxon Synergy",
        icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        map: map
    });
    var red = new google.maps.Marker({
        position: {lat: 65, lng: 75},
        title: "Plexus Red",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        map: map
    });
    var green = new google.maps.Marker({
        position: {lat: 67, lng: 97},
        title: "Plexus Analysis",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        map: map
    });
    var bio = new google.maps.Marker({
        position: {lat: 60, lng: 110},
        title: "Plexus Biologics",
        icon: "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png",
        map: map
    });
    var compreg = new google.maps.Marker({
        position: {lat: 40, lng: 125},
        title: "Compound Registration",
        icon: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
        map: map
    });
    var sre = new google.maps.Marker({
        position: {lat: 50, lng: 90},
        title: "SRE",
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon17.png",
        map: map
    });

    map.mapTypes.set('cxn', cxnMapType);
    map.setMapTypeId('cxn');
}

function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;


    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
        return null;
    }

    return {x: x, y: y};
}

function markerFromData (source, map) {
    $.getJSON(source, function (data) {
        console.log("data", data);
        $.each(data, function (key, value) {
            console.log(value);
            var marker = new google.maps.Marker(value);
            marker.setMap(map);
        })
    });
}