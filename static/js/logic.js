
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '©<a href="https://www.openstreetmap.org/">OpenStreetMap</a></a> | ©<a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 8,
        minZoom: 4,
        accessToken: 'pk.eyJ1IjoicGVubG93OTkiLCJhIjoiY2tsZDgzOXNpMDF6YTJ1cXBiaXZ6cDl3bCJ9.BJssP1C-Mp7LCPqEQhmOow'
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '©<a href="https://www.openstreetmap.org/">OpenStreetMap</a></a> | ©<a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 8,
    minZoom: 4,
    accessToken: 'pk.eyJ1IjoicGVubG93OTkiLCJhIjoiY2tsZDgzOXNpMDF6YTJ1cXBiaXZ6cDl3bCJ9.BJssP1C-Mp7LCPqEQhmOow'
});

// Create a base layer that holds both maps.
let baseMaps = {
  "<span style='color: black'>Dark</span>": dark,
  "<span style='color: black'>Street</span>": streets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [38.65, -98.05],
  zoom: 4,
  layers: [dark]
})

// add image as legend
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        labels = [""];
        div.innerHTML = '<img src="static/images/map_legend.png"></img>'
    return div;
};
legend.addTo(map);

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Load up the MSA geojson data
let MSAjson = "https://raw.githubusercontent.com/penlow99/Mapping_MSA/main/MSA_geo.geojson"
let stateCropData = "https://raw.githubusercontent.com/FabulousErin/Project_2/main/static/data/production_data_sorted.csv?raw=true"
// get color scale for heat map colors
var color_array = chroma.scale(['#004EC2', '#FFF']).colors(Object.keys(data_dict['MSA']).length)
//console.log(chroma.scale(['#195785', '#8b8bd5']).colors(4))

// Grabbing our GeoJSON data.
d3.json(MSAjson).then(function(data) {
// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    filter: function(feature) {
      if (data_dict['MSA'][feature.properties.cbsafp]) return true
    },
    style : function(feature) {
      let cbsa = feature.properties.cbsafp;
      poly_style = {
        color: "black",
        weight: 1,
        fillColor: color_array[data_dict['index'][cbsa]],
        fillOpacity: .9
      }
      return poly_style
    },
    onEachFeature: function(feature, layer) {
      let cbsa = feature.properties.cbsafp;
      layer.bindPopup(build_html(cbsa));
    }
  }).addTo(map);
});

//---------------------------------------------------------------------------------------
function build_html(cbsa) {
  try {
    var html = `
    <div>
      <h6 style="width: 170px; diplay: inline; text-align: center;"><b>`  + data_dict['MSA'][cbsa] + `</b></h6>
      <table style="diplay: inline; margin: auto; width: 180px;">
        <tr>
            <td>CBSA : </td>
            <td>` + cbsa + `</td>
        </tr>
        <tr>
            <td>Population RoC : </td>
            <td>` + data_dict['2024_Pop_ROC'][cbsa].toFixed(2) + `</td>
        </tr>
        <tr>
            <td>GDP RoC : </td>
            <td>` + data_dict['2024_GDP_ROC'][cbsa].toFixed(2) + `</td>
        </tr>
        <tr>
            <td>Unemployment : </td>
            <td>` + data_dict['2024_Unem_Rate'][cbsa].toFixed(2) + `</td>
        </tr>
        
        <tr>
            <td>Bus. Applications RoC : </td>
            <td>` + data_dict['2024_Bus_ROC'][cbsa].toFixed(2) + `</td>
        </tr>
        <tr>
            <td>Total Score : </td>
            <td>` + data_dict['Total_Score'][cbsa] + `</td>
        </tr>
      </table>
      <h6 style="width: 170px; diplay: inline; text-align: center;">Ranking : `  + data_dict['Overall_Rank'][cbsa] + `</h6>
    </div>
    `
  }
  catch (err) {
    console.log('Problem child is: ' + cbsa + ' -- ' + data_dict['MSA'][cbsa])
  }
  return html
}

