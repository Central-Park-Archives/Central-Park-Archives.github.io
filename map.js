//
// Create Mapbox map
//

{
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2VudHJhbHBhcmthcmNoaXZlcyIsImEiOiJja2J3aXdtYzAwZ2ZrMnpucXhjcG9jbHdxIn0.eLl8yDer989epHWEfqABpA";

  var map = new mapboxgl.Map({
    container: "map",
    pitch: 60,
    //style: 'mapbox://styles/centralparkarchives/ckdqg82ru045r19o3mwqadnj0', // stylesheet location
    style: "mapbox://styles/centralparkarchives/ckfbezg2g1f211ap0uzgitj7l", // stylesheet location
    center: [24.912975, 60.227151], // starting position [lng, lat]
    zoom: 16
  });
}

// Define bounds that conform to the `LngLatBoundsLike` object.
var bounds = [
  [24.874919529144393, 60.21768383792113], // [west, south]
  [24.949899195130172, 60.238868778804886] // [east, north]
];

// Set the map's max bounds.
map.setMaxBounds(bounds);

//
// Map controls
//

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }),
  'bottom-right'
);

//  Add layer toggles
{
  var toggleableLayers = [{
      heading: "Vanhat ilmakuvat / Old aerial maps",
      layers: [
        'Ilmakuva 1932',
        'Ilmakuva 1943',
        'Ilmakuva 1950',
        'Ilmakuva 1964',
        'Ilmakuva 1976',
        'Ilmakuva 1988',
        'Ilmakuva 2014'
      ]
    },
    {
      heading: "Kokoelmat/ Collections",
      layers: [
        "Viljelypalstan tarinoita / Allotment stories",
        "Maunulan Sanomat / Maunula Newspaper",
        "Pariutumisleikki / Flying-squirrel mating games",
        "Yleiskaava 2050 protestit / General plan 2050 protests"
      ]
    }
  ];
  var currentLayer = toggleableLayers[0]['layers'][0];

  // Set the label to the aerial image
  function chooseMap(ilmakuva) {
    // Set the label to the aerial imagery name
    map.setLayoutProperty(currentLayer, 'visibility', 'none');
    currentLayer = toggleableLayers[0]['layers'][ilmakuva];
    map.setLayoutProperty(currentLayer, 'visibility', 'visible');
    document.getElementById('slider-label').textContent = currentLayer;
  }

  document
    .getElementById('slider')
    .addEventListener('input', function (e) {
      var ilmakuva = parseInt(e.target.value, 10);
      chooseMap(ilmakuva);
    });

  // set up the corresponding toggle button for each layer
  var menu = document.getElementById("menu");
  var audioLayer = "Viljelypalstan tarinoita / Allotment stories";
  var sanomatLayer = "Maunulan Sanomat / Maunula Newspaper";
  var squirrelsLayer = "Pariutumisleikki / Flying-squirrel mating games";
  var protestsLayer = "Yleiskaava 2050 protestit / General plan 2050 protests";

  for (var i = 0; i < toggleableLayers.length; i++) {
    var heading = toggleableLayers[i].heading;
    var layers = toggleableLayers[i].layers;

    var div = document.createElement("div");

    var header = document.createElement("h2");
    header.textContent = heading;

    var layersList = document.createElement("ul");

    for (var j = 0; j < layers.length; j++) {
      var id = layers[j];

      var link = document.createElement("a");
      link.href = "#";
      link.textContent = id;
      link.className = "active";

      link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, "visibility");

        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === "visible") {
          map.setLayoutProperty(clickedLayer, "visibility", "none");
          this.className = "";
        } else {
          this.className = "active";
          map.setLayoutProperty(clickedLayer, "visibility", "visible");
        }
      };

      var li = document.createElement("li");
      li.appendChild(link);
      layersList.appendChild(li);
    }

    div.appendChild(header);
    div.appendChild(layersList);
    menu.appendChild(div);
  }
}

//
//  Map logic
//

map.on("load", function () {
  loadMapLayers();
  addMapInteractions();
});

//
// Map functions
//

function loadMapLayers() {
  // Map data sources

  map.addSource(audioLayer, {
    type: "geojson",
    generateId: true,
    data: null
  });

  map.addSource(protestsLayer, {
    type: "geojson",
    generateId: true,
    data: null
  });

  map.addSource("aerial-1932", {
    type: "raster",
    tiles: [
      "https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1932&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource("aerial-1943", {
    type: "raster",
    tiles: [
      "https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1943&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource("aerial-1950", {
    type: "raster",
    tiles: [
      "https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1950&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource("aerial-1964", {
    type: "raster",
    tiles: [
      "https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1964&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource("aerial-1976", {
    type: "raster",
    tiles: [
      "https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1976&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource("aerial-1988", {
    type: "raster",
    tiles: [
      "https://geoserver.hel.fi:443/geoserver/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=orto1988&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource("aerial-2014", {
    type: "raster",
    tiles: [
      "https://kartta.hel.fi/ws/geoserver/avoindata/wms?SERVICE=WMS&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=avoindata:Ortoilmakuva_2014&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=epsg:3857&bbox={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
    ],
    tileSize: 256
  });

  map.addSource('streams-shape', {
    type: 'geojson',
    data: '/streams.geojson'
  });

  // Map layers

  map.addLayer({
      id: "Ilmakuva 1932",
      type: "raster",
      source: "aerial-1932",
      layout: {
        visibility: "none"
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: "Ilmakuva 1943",
      type: "raster",
      source: "aerial-1943",
      layout: {
        visibility: "none"
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: "Ilmakuva 1950",
      type: "raster",
      source: "aerial-1950",
      layout: {
        visibility: "none"
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: "Ilmakuva 1964",
      type: "raster",
      source: "aerial-1964",
      layout: {
        visibility: "none"
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: "Ilmakuva 1976",
      type: "raster",
      source: "aerial-1976",
      layout: {
        visibility: "none"
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: "Ilmakuva 1988",
      type: "raster",
      source: "aerial-1988",
      layout: {
        visibility: "none"
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: 'Ilmakuva 2014',
      type: 'raster',
      source: 'aerial-2014',
      layout: {
        visibility: 'none'
      }
    },
    'aeroway-line'
  );

  map.addLayer({
      id: 'streams',
      type: 'line',
      source: 'streams-shape',
      layout: {
        visibility: 'visible'
      }
    },
    'aeroway-line'
  );

  map.addLayer({
      id: audioLayer,
      type: "circle",
      source: audioLayer,
      paint: {
        "circle-color": [
          "case",
          ["boolean", ["feature-state", "focus"], false],
          "red",
          ["boolean", ["feature-state", "active"], false],
          "blue",
          ["boolean", ["feature-state", "nearest"], false],
          "black",
          "grey"
        ],
        "circle-stroke-width": [
          "case",
          ["boolean", ["feature-state", "nearest"], false],
          1,
          0
        ],
        "circle-radius": ["+", 5, ["/", 0.05, ["feature-state", "distance"]]]
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: protestsLayer,
      type: "circle",
      source: protestsLayer,
      paint: {
        "circle-color": "yellow",
        "circle-radius": 10
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: sanomatLayer,
      type: "circle",
      source: {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [24.9129716, 60.2271529]
          },
          "properties": {}
        }
      },
      paint: {
        "circle-color": "green",
        "circle-radius": 15,
        "circle-stroke-color": "white",
        "circle-stroke-width": 4
      }
    },
    "aeroway-line"
  );

  map.addLayer({
      id: squirrelsLayer,
      type: "circle",
      source: {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [24.908107, 60.229079]
          },
          "properties": {}
        }
      },
      paint: {
        "circle-color": "brown",
        "circle-radius": 15,
        "circle-stroke-color": "white",
        "circle-stroke-width": 4
      }
    },
    "aeroway-line"
  );

  // Request spreadsheet data

  // Audio
  var sheetId = "1xdQ4APVwv0hKdVTZNcGdQIg1IWEHaUT-zd7T1WczQQI";
  var sheetName = "Taulukko1";
  fetch(
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`
    )
    .then(resp => resp.text())
    .then(data => {
      csv2geojson.csv2geojson(
        data, {
          latfield: "Latitude",
          lonfield: "Longitude",
          delimiter: ","
        },
        function (err, data) {
          // Control volume of audio locations based on distance
          addHotspots(data, audioLayer);
        }
      );
    });

  // Protests
  var sheetIdProtests = "11vGwoFUocfgj_71kEqLxXjsWZwfVvFhGtwAoFDR6icA";
  var sheetNameProtests = "Sheet2";
  fetch(
      `https://docs.google.com/spreadsheets/d/${sheetIdProtests}/gviz/tq?tqx=out:csv&sheet=${sheetNameProtests}`
    )
    .then(resp => resp.text())
    .then(data => {
      csv2geojson.csv2geojson(
        data, {
          latfield: "lat",
          lonfield: "long",
          delimiter: ","
        },
        function (err, data) {
          map.getSource(protestsLayer).setData(data);
        }
      );
    });

  // Sanomat
  var sheetIdSanomat = "1sTm4jQas_tA5WGMguqZv7H1N11ShAYjXZ14PIreinp8";
  var sheetNameSanomat = "Sheet2";
  fetch(
      `https://docs.google.com/spreadsheets/d/${sheetIdSanomat}/gviz/tq?tqx=out:csv&sheet=${sheetNameSanomat}`
    )
    .then(resp => resp.text())
    .then(data => {
      csv2geojson.csv2geojson(
        data, {
          delimiter: ","
        },
        function (err, data) {
          var images = document.getElementById("images-sanomat");

          data.features.forEach((item, i) => {
            var div = document.createElement("div");
            var img = document.createElement("img");
            var title = document.createElement("h4");
            var meta = document.createElement("p");
            var description = document.createElement("p");
            var person = document.createElement("p");

            img.src = `https://drive.google.com/uc?export=view&id=${item.properties.id}`;
            img.alt = item.properties.title;
            title.textContent = `${item.properties.title}`;
            meta.textContent = `${item.properties.place}, ${item.properties.date}`;
            description.textContent = `${item.properties.summary}`;
            person.textContent = `${item.properties.person}`;

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(meta);
            div.appendChild(description);
            div.appendChild(person);
            images.appendChild(div);
          });

          var sliderSanomat = tns({
            container: images,
            items: 1,
            mode: 'gallery',
            controlsPosition: 'bottom',
            controlsText: ['←', '→'],
            nav: false
          });
        }
      );
    });

  // Squirrels
  var sheetIdSquirrels = "1i0VdIpYJpJjPiCMQTZEvZW8QaOk947Rq5J1KsHPOsuY";
  var sheetNameSquirrels = "Sheet1";

  fetch(
      `https://docs.google.com/spreadsheets/d/${sheetIdSquirrels}/gviz/tq?tqx=out:csv&sheet=${sheetNameSquirrels}`
    )
    .then(resp => resp.text())
    .then(data => {
      csv2geojson.csv2geojson(
        data, {
          delimiter: ","
        },
        function (err, data) {
          var images = document.getElementById("images-squirrels");

          data.features.forEach((item, i) => {
            var div = document.createElement("div");
            var img = document.createElement("img");
            var title = document.createElement("h4");
            var meta = document.createElement("p");
            var description = document.createElement("p");
            var person = document.createElement("p");

            img.src = `https://drive.google.com/uc?export=view&id=${item.properties.id}`;
            img.alt = item.properties.title;
            title.textContent = `${item.properties.title}`;
            meta.textContent = `${item.properties.place}, ${item.properties.date}`;
            description.textContent = `${item.properties.summary}`;
            person.textContent = `${item.properties.person}`;

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(meta);
            div.appendChild(description);
            div.appendChild(person);
            images.appendChild(div);
          });

          var sliderSquirrels = tns({
            container: images,
            items: 1,
            mode: 'gallery',
            controlsPosition: 'bottom',
            controlsText: ['←', '→'],
            nav: false
          });
        }
      );
    });
}

//
// Add map interactions
//
function addMapInteractions() {
  // When a click event occurs on a feature in the csvData layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", audioLayer, function (e) {
    var row = e.features[0];
    var coordinates = row.geometry.coordinates.slice();

    // You can adjust the values of the popup to match the headers of your CSV.
    // For example: e.features[0].properties.Name is retrieving information from the field Name in the original CSV.
    var description = `<h4>${row.properties.title}</h4>`;
    var fileId = row.properties.link.split("/")[5];
    description += `<audio controls><source src="https://drive.google.com/uc?export=view&id=${fileId}" type="audio/mp3"></audio>`; // Use media from google drive directly https://support.google.com/drive/thread/34363118?hl=en
    //description += `<p>${row.properties["file name / link"]}</p>`;
    description += `<p>${row.properties.person} ${row.properties.date}</p>`;
    description += `<p>${row.properties.summary}</p>`;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    //add Popup to map
    new mapboxgl.Popup({
        maxWidth: "320"
      })
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  // inspect on click
  map.on("click", audioLayer, function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: [audioLayer]
    });

    map.easeTo({
      center: features[0].geometry.coordinates
    });
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", audioLayer, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", audioLayer, function () {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", protestsLayer, function (e) {
    var row = e.features[0];
    var coordinates = row.geometry.coordinates.slice();

    // You can adjust the values of the popup to match the headers of your CSV.
    // For example: e.features[0].properties.Name is retrieving information from the field Name in the original CSV.
    var description = `<img src="https://drive.google.com/uc?export=view&id=${row.properties.id}"/>`;
    description += `<h4>${row.properties.title}</h4>`;
    description += `<p>${row.properties.date}</p>`;
    description += `<p>${row.properties.summary}</p>`;
    description += `<p>${row.properties.person}</p>`;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    //add Popup to map
    new mapboxgl.Popup({
        maxWidth: "420"
      })
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });
  map.on("mouseenter", protestsLayer, function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", protestsLayer, function () {
    map.getCanvas().style.cursor = "";
  });

  var imagesModal = document.getElementById("images-modal");
  var tnsGalleries = document.querySelectorAll(".tns-outer");

  map.on("click", sanomatLayer, function (e) {
    imagesModal.className = "active";
    document.getElementById("images-squirrels-ow").classList.remove("active");
    document.getElementById("images-sanomat-ow").classList.add("active");
  });
  map.on("mouseenter", sanomatLayer, function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", sanomatLayer, function () {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", squirrelsLayer, function (e) {
    imagesModal.className = "active";
    document.getElementById("images-sanomat-ow").classList.remove("active");
    document.getElementById("images-squirrels-ow").classList.add("active");
  });
  map.on("mouseenter", squirrelsLayer, function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", squirrelsLayer, function () {
    map.getCanvas().style.cursor = "";
  });

  document.getElementById("images-modal-close").onclick = function (e) {
    imagesModal.className = "";
    return false;
  };

  // Toggle aerial timeslider map overlay
  var mapOverlay = document.getElementById("map-overlay");
  document.getElementById("map-overlay-toggle").onclick = function (e) {
    if (mapOverlay.className == 'active') {
      mapOverlay.className = ""
      this.firstElementChild.className = ""
      map.setLayoutProperty(currentLayer, 'visibility', 'none');
    } else {
      mapOverlay.className = "active"
      this.firstElementChild.className = "active"
      chooseMap(toggleableLayers[0]['layers'].indexOf(currentLayer))
    }
    return false;
  };

  // Toggle about-text
  var aboutText = document.getElementById("about-text");
  document.getElementById("site-title").onclick = function (e) {
    aboutText.className = "active";
    return false;
  };
  document.getElementById("about-close").onclick = function (e) {
    aboutText.className = "";
    return false;
  };

  // Menu toggle on mobile
  var menu = document.getElementById("menu");
  document.getElementById("nav-toggle").onclick = function (e) {
    if (menu.className == "active") {
      menu.className = "";
    } else {
      menu.className = "active";
    }
    return false;
  };

}

// Add map hotspots from given data points

function addHotspots(data, mapSource) {
  addHotspotAudio();
  updateHotspot(map.getCenter().toArray());

  map.on("move", function (e) {
    updateHotspot(map.getCenter().toArray());
  });

  // Control hotspot with mouse
  // map.on('mousemove', function (e) {
  //     updatelHotspot(e.lngLat.toArray();
  // });

  // Add audio files that will be controlled by the hotspots
  function addHotspotAudio() {
    data.features.forEach((f, idx) => {
      var fileId = f.properties.link.split("/")[5];
      document.getElementById(
        "audio"
      ).innerHTML += `<audio controls loop preload="none" id="audio-${idx}"><source src="https://drive.google.com/uc?export=view&id=${fileId}" type="audio/mp3"></audio>`;
    });
  }

  // Update hotspot data based on location
  // Calculate distance from location to each hotspot

  function updateHotspot(location) {
    var activeHotspotDistance = 0.1; // Hotspot content becomes active at this distance
    var focusHotspotDistance = 0.01; // Focus is given to the nearest hotspot at this distance
    var maxActiveHotspots = 3;

    // Find nearest hotspot to location
    {
      var nearestHotspot = turf.nearest(location, data);

      map.removeFeatureState({
        source: mapSource
      });
      map.setFeatureState({
        source: mapSource,
        id: nearestHotspot.properties.featureIndex
      }, {
        nearest: true
      });
    }

    var focusHotspot= false;
    var activeHotspots = [];

    data.features.forEach((f, idx) => {
      var distance = turf.distance(
        location,
        turf.point(f.geometry.coordinates)
      );

      data.features[idx].properties["distance"] = distance;

      map.setFeatureState({
        source: audioLayer,
        id: idx
      }, {
        distance: distance,
        active: distance < activeHotspotDistance ? true : false,
        focus: distance < focusHotspotDistance ? true : false
      });

      // Play audio of nearby hotspots

      if (distance < activeHotspotDistance) {
        // Focus on a single audio for the nearest active hotspot
        // Else play all active with volume scaled by distance

        if (distance < focusHotspotDistance) {
          focusHotspot= true;

          if (idx == nearestHotspot.properties.featureIndex) {
            // Pause all nearby hostposts to focus on nearest active one
            activeHotspots.forEach(idx =>
              document.getElementById("audio-" + idx).pause()
            );

            document.getElementById("audio-" + idx).volume = 1;
            document.getElementById("audio-" + idx).play();
          }
        } else {
          if (!focusHotspot && activeHotspots.length < maxActiveHotspots) {
            activeHotspots.push(idx);

            var volume = scaleValue(
              distance,
              [focusHotspotDistance, activeHotspotDistance],
              [0.9, 0]
            );
            document.getElementById("audio-" + idx).volume = volume;
            document.getElementById("audio-" + idx).play();
          } else {
            document.getElementById("audio-" + idx).pause();
          }
        }
      } else {
        document.getElementById("audio-" + idx).pause();
      }
    });

    map.getSource(audioLayer).setData(data);
  }
}

// Utility

function scaleValue(value, from, to) {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return capped * scale + to[0];
}
const index = (scale, min, max, bands, n) =>
  Math.floor((bands * scale(n - min)) / scale(max - min + 1));

const log = x => Math.log(x + 1);

const logBand = n => scaleValue(log, 0, 100, 5, n);
