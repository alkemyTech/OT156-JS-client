import React from "react";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
import "./styles/success.css";

export default function SuccessAlert({ title }) {
    const SweetAlert = withSwalInstance(swal);
    const showAlert = () => {
      swal.fire({
        type: "success",
        title,
        customClass: {
          title: "successTitle",
          icon: "successIcon",
          popup: "successContainer",
          confirmButton: "successButton",
        },
      });
    };
  
    return (
      <div className="successRoot">
        <button onClick={() => showAlert()}>Alert</button>
        <SweetAlert />
      </div>
    );
  }