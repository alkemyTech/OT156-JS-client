import './RegistrationForm.css';
import React, { useState } from "react";
import { Formik, Field, Form as Form2, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../../components/Alerts/SuccessAlert";

const RegistrationForm = () => {
  const [sendComplete, setSendComplete] = useState({
    error: false,
    success: false,
    msg: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Campo obligatorio"),
    lastname: Yup.string().required("Campo obligatorio"),
    password: Yup.string()
      .min(6, "Demasiado corto")
      .required("Campo obligatorio"),
    email: Yup.string().email("Email no valido").required("Campo obligatorio"),
  });
  const initialForm = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };
  return (
    <>
      <div className="formContainer">
        <Formik
          initialValues={initialForm}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            const { name: firstName, lastname: lastName, email, password } = values;
            axios.post("http://localhost:3000/users/register", {
              firstName,
              lastName,
              email,
              password
            }).then((res) => {
              const token = res.data.token;
              localStorage.setItem("token", token);
              dispatch(login(res.data));
              resetForm();
              setSendComplete({
                error: false,
                success: true,
                msg: 'Se ha registrado correctamente.'
              })
              setTimeout(() => {
                navigate("/");
              }, 2000);
            })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {({ errors }) => (
            <Form2>
              <Form.Group className="mb-2">
                <Form.Label style={{ display: "flex" }}>Nombre</Form.Label>
                <Field name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className="invalid-feedback" style={{ display: "inline" }}>
                      {errors.name}
                    </div>
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label style={{ display: "flex" }}>Apellido</Form.Label>{" "}
                <Field name="lastname" className="form-control" />{" "}
                <ErrorMessage
                  name="lastname"
                  component={() => (
                    <div className="invalid-feedback" style={{ display: "inline" }}>
                      {errors.lastname}
                    </div>
                  )}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label style={{ display: "flex" }}>Email</Form.Label>
                <Field name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className="invalid-feedback" style={{ display: "inline" }}>
                      {errors.email}
                    </div>
                  )}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label style={{ display: "flex" }}>Password</Form.Label>
                <Field name="password" className="form-control" type="password" />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className="invalid-feedback" style={{ display: "inline" }}>
                      {errors.password}
                    </div>
                  )}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form2>
          )}
        </Formik>
      </div>

      {sendComplete.success && (
        <SuccessAlert title={sendComplete.msg}>

        </SuccessAlert>
      )}
    </>
  );
};
export default RegistrationForm;
