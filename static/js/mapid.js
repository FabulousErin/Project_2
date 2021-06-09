function init() {
    console.log("init")
        // Creating our initial map object
        var myMap = L.map("mapid", {
            center: [45.52, -122.67],
            zoom: 16
        });

        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/light-v10",
            accessToken: "pk.eyJ1IjoiZXJpbi1uYXpldHRhIiwiYSI6ImNrcDRvaTExaTBib2cyeHQ4dWVyaDVlNWoifQ.DKcPTFaA051G8dTXau3ErQ",
        }).addTo(myMap);

//L.geoJson(statesData).addTo(map);

};

window.addEventListener('DOMContentLoaded', init);