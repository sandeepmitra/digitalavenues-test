import { Bar } from "react-chartjs-2";

function BarChart(props) {
  let dataLbls = [];
  let qtyData = [];
  let sellData = [];

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (props.qtySellState) {
    let qtySell = props.qtySellState;

    dataLbls = qtySell.map(item => months[item.month - 1] + ", " + item.year);
    qtyData = qtySell.map(item => item.totalCount);
    sellData = qtySell.map(item => item.total_sale);
  }

  //console.log(dataLbls);

  return (
    <Bar
      data={{
        labels: dataLbls,
        datasets: [
          {
            label: "Quantity",
            data: qtyData,
            borderColor: "rgba(52, 180, 235)",
            backgroundColor: "rgba(52, 180, 235)"
          },
          {
            label: "Amount",
            data: sellData,
            borderColor: "rgba(235, 174, 52)",
            backgroundColor: "rgba(235, 174, 52)"
          }
        ]
      }}
      width={600}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              },
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }
          ]
        }
      }}
    />
  );
}

export default BarChart;
