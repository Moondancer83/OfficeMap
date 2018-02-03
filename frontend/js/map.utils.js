
function getTileUrl (coord, zoom) {
    if (isInRange(zoom, coord, getRanges())) {
        //console.log("CUSTOM (x, y, z): ", coord.x, coord.y, zoom);
        return getCustomTileUrl(zoom, coord);
    } else {
        return "http://mt.google.com/vt/lyrs=s&x=" + coord.x + "&y=" + coord.y + "&z=" + zoom
    }
}

function isInRange (zoom, coord, ranges) {
    var range = ranges[zoom];
    return range &&
        range.x_min <= coord.x && coord.x <= range.x_max &&
        range.y_min <= coord.y && coord.y <= range.y_max
}

function markerFromData (data) {
    var result = [];
    $.each(data, function (key, value) {
        var marker = new google.maps.Marker(value);
        result.push(marker);
    });

    return result;
}
