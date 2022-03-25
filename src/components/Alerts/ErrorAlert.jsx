import React from "react";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
import "./styles/error.css";

export default function ErrorAlert({ title }) {
    const SweetAlert = withSwalInstance(swal);
    const showAlert = () => {
      swal.fire({
        type: "error",
        title,
        customClass: {
          title: "errorTitle",
          icon: "errorIcon",
          popup: "errorContainer",
          confirmButton: "errorButton",
        },
      });
    };
  
    return (
      <div className="errorRoot">
        <button onClick={() => showAlert()}>Alert</button>
        <SweetAlert />
      </div>
    );
  }