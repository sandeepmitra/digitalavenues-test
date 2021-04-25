import { useState, useContext } from "react";
import { Button, Modal } from "semantic-ui-react";
import NewOrderForm from "./NewOrderForm";
import Notifications from "./Notifications";
import NotificationContext from "../store/NotificationContext";
import "./component-styles/Popup.css";

export default function Popup(props) {
  const [open, setOpen] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <div className="orderModal">
      <Modal closeIcon onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button className="modalTrigger">New Order</Button>}>
        <Modal.Header>New Order</Modal.Header>
        <Modal.Content>
          <NewOrderForm modalhandler={setOpen} dashReload={props.dashReload} />
        </Modal.Content>
      </Modal>
      {activeNotification && <Notifications title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />}
    </div>
  );
}
