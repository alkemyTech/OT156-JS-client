import React from "react";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
import "./styles/alerts.css";

//type = ['error', 'success', 'info']
export default function Alerts({ title, type }) {
  const SweetAlert = withSwalInstance(swal);
  const showAlert = () => {
    swal.fire({
      type,
      title,
      customClass: {
        title: type + "Title",
        icon: type + "Icon",
        popup: type + "Container",
        confirmButton: type + "Button",
      },
    });
  };

  return (
    <div>
      <button onClick={() => showAlert()}>Alert</button>
      <SweetAlert />
    </div>
  );
}
