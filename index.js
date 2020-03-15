let vixData;
let uvxyData;
let dataJson = [];
let messageNo;
const urlAPI = "https://financialmodelingprep.com/api/v3/quote/";

// Fetching VIX
// setInterval(function() {
fetch(urlAPI + "%5EVIX, UVXY")
  .then(response => {
    if (!response.ok) {
      console.log("no status : 200");
      throw new Error(`Status Code Error: ${response.status}`);
    } else {
      response.json().then(data => {
        data.map(d => {
          if (d.symbol == "^VIX") {
            console.log(d);
            vixData = d;
            let text = document.getElementById("messageTest");
            text.innerHTML = vixData.price;
          } else if (d.symbol == "UVXY") {
            uvxyData = d;
            console.log(d);
          }
        });
      });
    }
  })
  .catch(err => {
    console.log("something went wrong with fetch");
    console.log(err);
  });

// Google Charts

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
let expiration = [];
let symbolStock = [];
let lastPrice = [];
let vix = [];
let settlement = [];
function drawChart() {
  fetch("./vix.json").then(resp => {
    resp.json().then(data => {
      dataJson = data;

      var data = new google.visualization.DataTable();
      data.addColumn("string", "Expiration");
      data.addColumn("number", "Last");
      data.addColumn("number", "Settlement");
      data.addColumn("number", "VIX");
      data.addColumn("number", "UVXY");
      //
      console.log(vixData);
      dataJson.map(obj => {
        if (obj.Last !== 0) {
          let vixPrice = vixData.price;
          let uvxy;
          let text = document.getElementById("messageTest");
          text.innerHTML = vixPrice;

          const { Symbol, Expiration, Last, Settlement } = obj;
          symbolStock.push(Symbol);
          expiration.push(Expiration);
          lastPrice.push(Last);
          settlement.push(Settlement);

          data.addRows([
            [Expiration, Last, Settlement, vixData.price, uvxyData.price]
            //
          ]);

          // var view = new google.visualization.DataView(data);
          // view.setColumns([
          //   0,
          //   1,
          //   {
          //     calc: "stringify",
          //     sourceColumn: 1,
          //     type: "string",
          //     role: "annotation"
          //   },
          //   2
          // ]);
          var chart = new google.visualization.LineChart(
            document.getElementById("curve_chart")
          );

          var options = {
            title: "VIX Performance",
            curveType: "line",
            legend: { position: "right" },
            displayAnnotations: true
          };
          chart.draw(data, options);
        }
      });
    });
  });
}

let text = document.getElementById("messageTest");
