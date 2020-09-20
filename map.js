//
// Create Mapbox map
//

{
    mapboxgl.accessToken =
        'pk.eyJ1IjoiY2VudHJhbHBhcmthcmNoaXZlcyIsImEiOiJja2J3aXdtYzAwZ2ZrMnpucXhjcG9jbHdxIn0.eLl8yDer989epHWEfqABpA';

    var map = new mapboxgl.Map({
        container: 'map',
        pitch: 60,
        style: 'mapbox://styles/centralparkarchives/ckdqg82ru045r19o3mwqadnj0', // stylesheet location
        center: [24.912975, 60.227151], // starting position [lng, lat]
        zoom: 16
    });
}

//
// Map controls
//

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

//  Add layer toggles
{
    var toggleableLayerIds = ['Ilmakuva 1932', 'Ilmakuva 1943', 'Ilmakuva 1950', 'Ilmakuva 1964', 'Ilmakuva 1976', 'Ilmakuva 1988'];

    // set up the corresponding toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            // toggle layer visibility by changing the layout object's visibility property
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };


        var layers = document.getElementById('menu');
        layers.appendChild(link);

    }

}

// 
//  Map logic
// 

map.on('load', function () {

    loadMapLayers();

    addMapInteractions();

});

//
// Map functions
//

function loadMapLayers() {


    // Map data sources

    map.addSource('sheet-data', {
        'type': 'geojson',
        'data': null
    });

    map.addSource('aerial-1932', {
        'type': 'raster',
        'tiles': [
        'https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1932&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });

    map.addSource('aerial-1943', {
        'type': 'raster',
        'tiles': [
        'https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1943&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });

    map.addSource('aerial-1950', {
        'type': 'raster',
        'tiles': [
            'https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1950&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });

    map.addSource('aerial-1964', {
        'type': 'raster',
        'tiles': [
            'https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1964&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });

    map.addSource('aerial-1976', {
        'type': 'raster',
        'tiles': [
            'https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1976&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });

    map.addSource('aerial-1988', {
        'type': 'raster',
        'tiles': [
            'https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1988&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });

    // Map layers

    map.addLayer({
            'id': 'Ilmakuva 1932',
            'type': 'raster',
            'source': 'aerial-1932',
            'layout': {
                'visibility': 'none'
            }
        },
        'aeroway-line'
    );

    map.addLayer({
            'id': 'Ilmakuva 1943',
            'type': 'raster',
            'source': 'aerial-1943',
            'layout': {
                'visibility': 'none'
            }
        },
        'aeroway-line'
    );

    map.addLayer({
            'id': 'Ilmakuva 1950',
            'type': 'raster',
            'source': 'aerial-1950',
            'layout': {
                'visibility': 'none'
            }
        },
        'aeroway-line'
    );

    map.addLayer({
            'id': 'Ilmakuva 1964',
            'type': 'raster',
            'source': 'aerial-1964',
            'layout': {
                'visibility': 'none'
            }
        },
        'aeroway-line'
    );

    map.addLayer({
            'id': 'Ilmakuva 1976',
            'type': 'raster',
            'source': 'aerial-1976',
            'layout': {
                'visibility': 'none'
            }
        },
        'aeroway-line'
    );

    map.addLayer({
            'id': 'Ilmakuva 1988',
            'type': 'raster',
            'source': 'aerial-1988',
            'layout': {
                'visibility': 'none'
            }
        },
        'aeroway-line'
    );

    map.addLayer({
            'id': 'sheet-data',
            'type': 'circle',
            'source': 'sheet-data',
            'paint': {
                'circle-color': 'red'
            }
        },
        'aeroway-line'
    );

    // Request spreadsheet data
    // https://docs.google.com/spreadsheets/d/1xdQ4APVwv0hKdVTZNcGdQIg1IWEHaUT-zd7T1WczQQI/edit?usp=sharing
    var sheetId = '1xdQ4APVwv0hKdVTZNcGdQIg1IWEHaUT-zd7T1WczQQI';
    var sheetName = 'Taulukko1';

    fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`)
        .then(resp => resp.text())
        .then(data => {
            csv2geojson.csv2geojson(data, {
                latfield: 'Latitude',
                lonfield: 'Longitude',
                delimiter: ','
            }, function (err, data) {
                map.getSource('sheet-data').setData(data)
            })
        })

}


//
// Add map interactions
//

function addMapInteractions() {

    // When a click event occurs on a feature in the csvData layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'sheet-data', function (e) {

        var row = e.features[0];
        var coordinates = row.geometry.coordinates.slice();

        //You can adjust the values of the popup to match the headers of your CSV. 
        // For example: e.features[0].properties.Name is retrieving information from the field Name in the original CSV. 
        var description = `<h4>${row.properties.place}</h4>`;
        var fileId='14JcrdS4FN9bPVK2OCvW6opInr8cN-mYK'
        description += `<audio controls><source src="https://drive.google.com/uc?export=${fileId}" type="audio/ogg"></audio>`
        description += `<p>${row.properties["file name / link"]}</p>`
        description += `<p>${row.properties.comments}</p>`
        description += `<p>${row.properties.topics}</p>`

        console.log(row)

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //add Popup to map

        new mapboxgl.Popup({
                maxWidth: '300'
            })
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // inspect on click
    map.on('click', 'sheet-data', function (e) {

        var features = map.queryRenderedFeatures(e.point, {
            layers: ['sheet-data']
        });

        map.easeTo({
            center: features[0].geometry.coordinates
        });

    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'sheet-data', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'sheet-data', function () {
        map.getCanvas().style.cursor = '';
    });
}
