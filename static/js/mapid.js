function init() {
    console.log("init")
        // Creating our initial map object
        var myMap = L.map("mapid", {
            center: [45.52, -122.67],
            zoom: 3
        });

        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/light-v10",
            accessToken: "pk.eyJ1IjoiZXJpbi1uYXpldHRhIiwiYSI6ImNrcDRvaTExaTBib2cyeHQ4dWVyaDVlNWoifQ.DKcPTFaA051G8dTXau3ErQ",
        }).addTo(myMap);
        

// Grabbing our GeoJSON data.
d3.json("/static/data/state_outlines.json").then(function(data) {
    // Creating a GeoJSON layer with the retrieved data.
      L.geoJson(data, {
        // filter: function(feature) {
        //   if (data_dict['MSA'][feature.properties.cbsafp]) return true
        // },
        // style : function(feature) {
        //   let cbsa = feature.properties.cbsafp;
        //   poly_style = {
        //     color: "black",
        //     weight: 1,
        //     fillColor: color_array[data_dict['index'][cbsa]],
        //     fillOpacity: .9
        //   }
        //   return poly_style
        // },
        // onEachFeature: function(feature, layer) {
        //   let cbsa = feature.properties.cbsafp;
        //   layer.bindPopup(build_html(cbsa));
        // }
      }).addTo(myMap);
    });
};
window.addEventListener('DOMContentLoaded', init);