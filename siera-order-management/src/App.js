import { Grid } from "semantic-ui-react";
import React, { useEffect, useState, useRef } from "react";
import Popup from "./components/Popup";
import Datagrid from "./components/Datagrid";
import Simpletable from "./components/Simpletable";
import ListData from "./components/ListData";
import BarChart from "./components/BarChart";
import { NotificationContextProvider } from "./store/NotificationContext";
import "./App.css";
import Axios from "axios";

function App() {
  //Get Top selling products
  const [topProducts, setTopProducts] = useState();

  async function fetchTopSellingProducts() {
    // Top 20 selling products of lats 7 days ...
    let response = await Axios.get("http://localhost:5000/get-top-products");
    setTopProducts(response.data.topProducts);
  }

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);

  //Get Sell Data
  const [sellData, setSellData] = useState();

  async function fetchTopSellData() {
    let response = await Axios.get("http://localhost:5000/get-all-sell-data");
    setSellData(response.data.sellData);
  }

  useEffect(() => {
    fetchTopSellData();
  }, []);

  //Get Monthly Sell Data
  const [monthSellData, setMonthSellData] = useState();

  async function fetchMonthSellData() {
    let response = await Axios.get("http://localhost:5000/get-month-sell-data");
    setMonthSellData(response.data.monthSellData);
  }

  useEffect(() => {
    fetchMonthSellData();
  }, []);

  //Get Quantity Vs Sale
  const [qtySellState, setQtySellState] = useState();

  async function fetchqtySellData() {
    let response = await Axios.get("http://localhost:5000/get-qty-sell");
    setQtySellState(response.data.getQtySellData);
  }

  useEffect(() => {
    fetchqtySellData();
  }, []);

  //Dashboard Refresh
  const [dashBoardState, setDashBoardState] = useState(0);
  let dashRef = useRef(0);

  function refreshDashBaordHandler() {
    dashRef.current++;
    console.log(dashRef.current);
    setDashBoardState(dashRef.current);
  }

  useEffect(() => {
    fetchTopSellingProducts();
    fetchTopSellData();
    fetchMonthSellData();
    fetchqtySellData();
  }, [dashBoardState]);

  return (
    <NotificationContextProvider>
      <div className="App">
        <header className="siteHeader">
          <div className="brand">Siera Agro Company Private Limited</div>
          <nav className="mainMenu">
            <a href="/#">Home</a>
            <a href="/about">About</a>
            <a href="/help">Help</a>
          </nav>
        </header>
        <header className="pageHeader">
          <div className="pageTitle">Dashboard</div>
          <div className="tools">
            <Popup dashReload={refreshDashBaordHandler} />
          </div>
        </header>
        <div className="container">
          <Grid>
            <Grid.Column>
              <div className="gridDards">
                <h3>Top 20 Selling Products (Last 7 days)</h3>
                <Datagrid topProd={topProducts} />
              </div>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <div className="gridDards">
                <h3>High vs Low</h3>
                <Simpletable sellData={sellData} />
              </div>
            </Grid.Column>
          </Grid>
          <Grid columns="equal" stackable>
            <Grid.Row stretched>
              <Grid.Column width={5}>
                <div className="gridDards">
                  <h3>Sale in the last 3 months</h3>
                  <ListData monthSellData={monthSellData} />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="gridDards">
                  <h3>Quantity vs Sale</h3>
                  <BarChart qtySellState={qtySellState} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <footer>
          <div className="copyright">This is a test application created for evaluation purpose</div>
        </footer>
      </div>
    </NotificationContextProvider>
  );
}

export default App;
