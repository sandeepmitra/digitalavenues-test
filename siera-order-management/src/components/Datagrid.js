import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataGridDemo(props) {
  const columns = [
    { field: "id", headerName: "Index" },
    { field: "product", headerName: "Product Name", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "totAmnt", headerName: "Total Amount ($)", flex: 1 }
  ];

  let rows = [];

  if (props.topProd) {
    props.topProd.map((item, k) => rows.push({ id: k, product: item.product_name, quantity: item.totalCount, totAmnt: item.total_selling_price }));
  } else {
    rows = [{ id: 1, product: "No Product", quantity: 0, totAmnt: 0 }];
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
