function Order(props) {
  const color = {
    queue: "white",
    startServing: "orange",
    pourBeer: "yellow",
    receivePayment: "green",
  };

  let order = [...props.order];
  const statusStyle = { color: color.queue };
  let manName = "";
  let tookenTime = {
    hours: "",
    minutes: "",
    seconds: "",
  };

  const orderClean = {};
  props.order.forEach((beer) => {
    orderClean[beer] = (orderClean[beer] || 0) + 1;
  });

  const orderMap = Object.keys(orderClean).map((item, i) => (
    <li key={"item-" + i}>
      {orderClean[item]} {item}
    </li>
  ));

  if (props.bartenders.find((bartender) => bartender.servingCustomer === props.id)) {
    const bartender = props.bartenders.filter((bartender) => bartender.servingCustomer === props.id)[0];
    manName = bartender.name;
    statusStyle.color = color.startServing;

    if (bartender.statusDetail === "receivePayment") {
      statusStyle.color = color.receivePayment;
    }
  }

  return (
    <li className="Order" data-id={props.id} style={statusStyle}>
      {props.id} {manName}
      <ul>{orderMap}</ul>
    </li>
  );
}

function OrdersToDo(props) {
  const queue = [...props.serving, ...props.queue];
  const orders = queue.map((order) => <Order key={order.id} {...order} {...props} />);

  const allOrders = [...orders].reverse();

  return <ul className="OrderToDo">{allOrders}</ul>;
}

export default function OrderList(props) {
  return (
    <aside className="OrderList">
      <div className="to-do">
        <h2>Orders to do</h2>
        <OrdersToDo {...props} />
      </div>
    </aside>
  );
}
