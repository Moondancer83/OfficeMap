

function initMap () {
    initData();
    setTimeout(function () {
        /**
         * Creating map
         */
        var map = createMap();
        map.setMapTypeId('satellite');

        /**
         * Adding map types
         */
        var hqBudapest = createHQBudapestMapType();
        map.mapTypes.set('budapest', hqBudapest);

        var officePrague = createPragueOfficeMapType();
        map.mapTypes.set('prague', officePrague);

        var officeBoston = createBostonOfficeMapType();
        map.mapTypes.set('boston', officeBoston);

        /**
         * Adding features
         */
        addCoordinates(map);
        addModeSwitcher(map);
        addCxnLocations(map);


    }, 2000);

}