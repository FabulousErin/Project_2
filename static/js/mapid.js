function init() {
  // console.log("init")
  // Creating our initial map object
  var myMap = L.map("mapid", {
    center: [37.0902, -95.7129],
    zoom: 4
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
  d3.json("/static/data/state_outlines.json").then(function (data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
      filter: function (feature) {
        if (feature.properties.NAME == "Alaska" || feature.properties.NAME == "Hawaii" || feature.properties.NAME == "Puerto Rico") return false
        else return true;
      },
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
      onEachFeature: function (feature, layer) {
        let state_click = feature.properties.NAME;
        layer.on({ click: OnClick });
        layer.bindPopup("Check out the charts below to see data for crops in " + feature.properties.NAME);

      }

    }).addTo(myMap);
  });
};
window.addEventListener('DOMContentLoaded', init);

var saved_state_output =""

function OnClick(state_output) {
  saved_state_output = state_output
  // console.log(state_output)
  // console.log(state_output.target.feature.properties.NAME.toUpperCase());
  pieChart(state_output.target.feature.properties.NAME.toUpperCase());
  barChart(state_output.target.feature.properties.NAME.toUpperCase());
  lineGraph(state_output.target.feature.properties.NAME.toUpperCase())
}

function optChange(commodityselected) {
  // console.log(saved_state_output.target.feature.properties.NAME.toUpperCase());
  lineGraph(saved_state_output.target.feature.properties.NAME.toUpperCase(),commodityselected)
}


function pieChart(state) {
  if (state === 'US TOTAL') {


    d3.json(`/prdpie/${state}`).then(function (statedata) {
      var mylabels = statedata.map(sdata => sdata.Commodity)
      var mydata = statedata.map(sdata => parseInt(sdata.Value.replaceAll(',', '')))
      // console.log(mylabels)
      // console.log(mydata)
      const data = {

        labels: mylabels,
        datasets: [{
          label: `${state}`,
          data: mydata,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(100, 205, 86)',
            'rgb(255, 205, 255)',
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'pie',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: `${state}'s Top 5 Crop Production by Value`
            }
          }
        }
      };

      var myChart = new Chart(
        document.getElementById('pieChart'),
        config
      );
    });
  } else {
    d3.json(`/prdpie/${state}`).then(function (statedata) {
      var mylabels = statedata.map(sdata => sdata.Commodity)
      var mydata = statedata.map(sdata => parseInt(sdata.Value.replaceAll(',', '')))
      // console.log(mylabels)
      // console.log(mydata)
      var myChart = Chart.getChart(`pieChart`)
      // removeData(myChart)
      addData(myChart, mylabels, mydata, state)
    })
  }
}

function addData(chart, label, data, state) {
  // console.log(chart.data.datasets)
  chart.data.labels = label;
  chart.options.plugins.title.text = `${state}'s Top 5 Crop Production by Value`;
  chart.data.datasets[0].data = data;
  // console.log(chart.data.datasets.data)
  chart.update();
}
function addDataBar(chart, label, data, state) {
  // console.log(chart.data.datasets)
  chart.data.labels = label;
  chart.options.plugins.title.text = `${state}'s Yearly Crop Area`;
  chart.data.datasets[0].data = data;
  // console.log(chart.data.datasets.data)
  chart.update();
}
function removeData(chart) {
  // console.log(chart.data.labels)
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}
pieChart('US TOTAL');
barChart('US TOTAL');
lineGraph('US TOTAL');

function barChart(state) {
  if (state === 'US TOTAL') {


    d3.json(`/areabar/${state}`).then(function (statedata) {

      var mylabels = statedata.map(sdata => sdata.Year);
      var mydata = statedata.map(sdata => parseInt(sdata.Value.replaceAll(',', '')));
      // console.log(mylabels);
      // console.log(mydata);
      const data = {
        labels: mylabels,
        datasets: [{
          label: `${state}`,
          data: mydata,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'bar',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: `${state}'s Yearly Crop Area`
            }
          }
        }
      };

      var myChart = new Chart(
        document.getElementById('barChart'),
        config
      );
    });
  } else {
    d3.json(`/areabar/${state}`).then(function (statedata) {
      var mylabels = statedata.map(sdata => sdata.Year)
      var mydata = statedata.map(sdata => parseInt(sdata.Value.replaceAll(',', '')))
      // console.log(mylabels)
      // console.log(mydata)
      var myChart = Chart.getChart(`barChart`)
      // removeData(myChart)
      addDataBar(myChart, mylabels, mydata, state)
    })
  }
}
function lineGraph(state,commodityselected="all") {
  if (state === 'US TOTAL') {


    d3.json(`/yieldline/${state}/${commodityselected}`).then(function (statedata) {
      var mylabels = statedata.map(sdata => sdata.Year)
      var mydata = statedata.map(sdata => parseInt(sdata.Value.replaceAll(',', '')))
      console.log(mylabels)
      console.log(mydata)
      const data = {

        labels: mylabels,
        datasets: [{
          label: `${state}`,
          data: mydata,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(100, 205, 86)',
            'rgb(255, 205, 255)',
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: `${state}'s Top 5 Crop Production by Value`
            }
          }
        }
      };

      var myChart = new Chart(
        document.getElementById('lineGraph'),
        config
      );
    });
  } else {
    d3.json(`/yieldline/${state}${commodityselected}`).then(function (statedata) {
      var mylabels = statedata.map(sdata => sdata.Year)
      var mydata = statedata.map(sdata => parseInt(sdata.Value.replaceAll(',', '')))
      // console.log(mylabels)
      // console.log(mydata)
      var myChart = Chart.getChart(`lineGraph`)
      // removeData(myChart)
      addData(myChart, mylabels, mydata, state)
    })
  }
}