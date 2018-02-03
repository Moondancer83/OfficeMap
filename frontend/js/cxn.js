/**
 * Boundary conditions for rendering HQ tiles.
 *
 * @type {Array}
 */
var HQ = [];
var locations = [];

function initData() {
    $.getJSON("data/locationRanges.json", function (data) {
        HQ = data;
    });
    $.getJSON("data/locations.json", function (data) {
        locations = data;
    });
}



function createMap () {
    return new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43, lng: -22},
        zoom: 3,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['satellite', 'budapest', 'prague', 'boston']
        }
    });
}



function createHQBudapestMapType () {
    return new google.maps.ImageMapType({
        getTileUrl: getTileUrl,
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 22,
        minZoom: 19,
        name: 'Budapest HQ'
    });
}

function createPragueOfficeMapType () {
    return new google.maps.ImageMapType({
        getTileUrl: getTileUrl,
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 22,
        minZoom: 19,
        name: 'Prague Office'
    });
}

function createBostonOfficeMapType () {
    return new google.maps.ImageMapType({
        getTileUrl: getTileUrl,
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 22,
        minZoom: 19,
        name: 'Boston Office'
    });
}


function addCoordinates (map) {
    var coordsDiv = document.getElementById('coords');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener('mousemove', function (event) {
        coordsDiv.textContent =
            'LAT:  ' + round2(event.latLng.lat(), map.getZoom() / 4) + ' | ' +
            'LNG:  ' + round2(event.latLng.lng(), map.getZoom() / 4) + ' | ' +
            'ZOOM: ' + map.getZoom();
    });
}

function addCxnLocations (map) {
    var markers = markerFromData(locations);
    $.each(markers, function (key, value) {
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


function addModeSwitcher (map) {
    map.addListener('maptypeid_changed', function () {
        switch (map.getMapTypeId()) {
            case 'budapest':
                map.setCenter(locations[0].position);
                break;
            case 'prague':
                map.setCenter(locations[1].position);
                break;
            case 'boston':
                map.setCenter(locations[2].position);
                break;
            default:
                break;
        }
    });
}


function getRanges () {
    return HQ;
}

function getCustomTileUrl (zoom, coord) {
    return 'img/' + zoom + '/cxn_' + coord.x + '_' + coord.y + '_' + zoom + '.png';
}

/**
 * Enhanced round function to handle double values as decimals.
 *
 * @param value
 * @param decimals
 */
function round2 (value, decimals) {
    round(value, Math.round(decimals));
}

/**
 * Rounding decimal numbers correctly.
 *
 * @author Jack Moore
 * @param value to round
 * @param decimals: number  of needed decimals
 * @returns {number}
 */
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
