import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Form, Input, Button, Dropdown } from "semantic-ui-react";
import "./component-styles/NewOrderForm.css";
import NotificationContext from "../store/NotificationContext";

export default function NewOrderForm(props) {
  function closeModal() {
    props.modalhandler(false);
  }

  const notificationCtx = useContext(NotificationContext);
  const [formErr, setFormErr] = useState({});

  function validate() {
    let valData = {};
    valData.orderDate = formState.orderDate ? "" : "This Field is Required";
    valData.productId = formState.productId ? "" : "This Field is Required";
    setFormErr({
      ...valData
    });

    return Object.values(valData).every(x => x === "");
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    let orderData = formState;
    if (validate()) {
      try {
        const response = await Axios.post("http://localhost:5000/new-order", orderData);
        let msgtitle, msg, msgstatus;
        if (response.status === 201) {
          msgtitle = "Error";
          msg = response.data[0];
          msgstatus = "error";
        }
        if (response.status === 200) {
          msgtitle = "Success";
          msg = response.data;
          msgstatus = "success";
        }
        notificationCtx.showNotification({
          title: msgtitle,
          message: msg,
          status: msgstatus
        });

        props.dashReload();
        props.modalhandler(false);
      } catch (err) {
        console.log(err);
        notificationCtx.showNotification({
          title: "Error",
          message: "Something Went Wrong",
          status: "error"
        });
      }
    } else {
      notificationCtx.showNotification({
        title: "Error - Invalid Input Data",
        message: "Please select valid date and product",
        status: "error"
      });
    }
  }

  // Date Validations
  let currentDate = new Date();
  const maxDate = currentDate.toISOString().split("T")[0];
  currentDate.setDate(currentDate.getDate() - 7);
  const minDate = currentDate.toISOString().split("T")[0];

  //Product Options
  const [allProductState, setAllProductState] = useState([]);

  async function fetchAllProducts() {
    let response = await Axios.get("http://localhost:5000/get-products");
    setAllProductState(response.data.products);
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  let productOptions = [];

  if (allProductState) {
    allProductState.map(item => productOptions.push({ key: item.product_id, text: item.product_name, value: item.product_id }));
  }

  // Get Form Data

  const initialVal = {
    orderDate: "",
    productId: "",
    price: "00.00",
    salePrice: "00.00"
  };

  const [formState, setFormState] = useState(initialVal);

  function handleInputChange(e, data) {
    setFormState({
      ...formState,
      [data.name]: data.value
    });

    if (e.target.classList.contains("text") || e.target.classList.contains("item")) {
      let selectedItem = allProductState.find(item => item.product_id === data.value);
      let itemHPrice = selectedItem.product_price + (selectedItem.product_price / 100) * 10.5;
      let itemGSTPrice = itemHPrice + (itemHPrice / 100) * 13.5;
      setFormState({
        ...formState,
        productId: selectedItem.product_id,
        price: selectedItem.product_price.toFixed(2),
        salePrice: itemGSTPrice.toFixed(2)
      });
    }
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Field inline>
        <label>Order Date</label>
        <Input className="inpElm" type="date" max={maxDate} min={minDate} name="orderDate" onChange={handleInputChange} />
      </Form.Field>
      <Form.Field inline>
        <label>Product</label>
        <Dropdown className="inpElm" placeholder="Select Product" search selection name="productId" options={productOptions} defaultValue={initialVal.productId} onChange={handleInputChange} />
      </Form.Field>
      <Form.Field inline>
        <label>Price</label>
        <Input className="inpElm" type="text" name="price" value={formState.price} disabled />
      </Form.Field>
      <Form.Field inline>
        <label>Sale Price</label>
        <Input className="inpElm" type="text" name="salePrice" value={formState.salePrice} disabled />
      </Form.Field>
      <Button positive type="submit">
        Save
      </Button>
      <Button color="grey" onClick={closeModal}>
        Cancel
      </Button>
    </Form>
  );
}
