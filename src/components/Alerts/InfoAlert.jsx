import React from "react";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
import "./styles/info.css";

export default function InfoAlert({ title }) {
  const SweetAlert = withSwalInstance(swal);
  const showAlert = () => {
    swal.fire({
      type: "info",
      title,
      customClass: {
        title: "infoTitle",
        icon: "infoIcon",
        popup: "infoContainer",
        confirmButton: "infoButton",
      },
    });
  };

  return (
    <div onClick={showAlert()}>
      <SweetAlert />
    </div>
  );
}
