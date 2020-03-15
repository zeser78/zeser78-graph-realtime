let vixDatac;
let uvxyDatac;
let dataJsonc = [];
let messageNoc;
const urlAPIc = "https://financialmodelingprep.com/api/v3/quote/";
//
let symbolStockc = [];
let expirationc = [];
let lastPricec = [];
let settlementc = [];
let myLineChart;
function drawChart() {
  fetch("./vix.json").then(resp => {
    resp.json().then(data => {
      dataJsonc = data;
      //   let symbolStock;
      console.log(data);
      dataJsonc.map(obj => {
        if (obj.Last !== 0) {
          const { Symbol, Expiration, Last, Settlement } = obj;
          //   symbolStockc.push(Symbol);
          expirationc.push(Expiration);
          lastPricec.push(Last);
          settlementc.push(Settlement);

          // console.log(message);
          // CHARTJS
          let ctx = document.getElementById("chart-1").getContext("2d");
          myLineChart = new Chart(ctx, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Expiration",
                  data: [...expirationc],
                  type: "line",
                  //   backgroundColor: ["rgba(255, 39, 32, 0.2)"],
                  // this dataset is drawn below
                  order: 1
                },
                {
                  label: "Last Price",
                  data: [...lastPricec],
                  type: "line",
                  borderColor: ["rgba(25, 99, 132, 0.2)"]
                  //   lineTension: 7,
                },
                {
                  label: "Settlement",
                  data: [...settlementc],
                  type: "line",
                  borderColor: ["rgba(2, 99, 32, 0.8)"],

                  lineTension: 0,
                  radius: 5,
                  datalabels: {
                    labels: {
                      title: " "
                    },
                    // color: "#fff000",
                    align: "top"
                  }
                  //   steppedLine: true,
                  // this dataset is drawn on top
                },
                {
                  label: "VIX",
                  data: [40, 40, 40],
                  type: "line",
                  borderColor: ["rgba(202, 99, 132, 0.8)"],

                  // this dataset is drawn on top
                  datalabels: {
                    labels: {
                      title: null
                    }
                  }
                }
              ],

              labels: [...expirationc]
            },
            options: {
              responsive: true,
              backgroundColor: ["#21ABCD"],

              tooltips: {
                showLines: true,
                mode: "index"
              },
              plugins: {
                //   Change options for ALL labels of THIS CHART
                datalabels: {
                  color: "#36A2EB",
                  align: "top",
                  display: "auto"
                }
              }
            }
          });
        }
        //     //
      });

      // }, 500);
    });
  });
}
drawChart();

function updateChart() {
  let num = Array(10).fill(Math.random() * 100);

  myLineChart.data.datasets[3].data = [...num];
  myLineChart.update();
}

setInterval(() => {
  updateChart();
}, 10000);
