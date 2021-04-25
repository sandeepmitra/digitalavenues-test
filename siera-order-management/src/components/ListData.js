import "./component-styles/ListData.css";

function ListData(props) {
  let monthDate = [];
  if (props.monthSellData) {
    monthDate = props.monthSellData;
  }

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <ul className="listContainer">
      {monthDate.map(item => {
        return (
          <li key={item.month}>
            <div className="liLbl">
              {months[item.month - 1]} {item.year}
            </div>
            <div className="liVal">${item.total_sale}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default ListData;
