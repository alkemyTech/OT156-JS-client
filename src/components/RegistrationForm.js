import React from "react";
import { Formik, Field, Form as Form2, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

const FieldLevelValidationExample = () => {
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
    <Formik
      initialValues={initialForm}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        //TODO alert provisoria cambiar cuando la card de alert esté terminada
        alert("hola");
        resetForm();
        // TODO POST /user cuando la ruta esté denifida
        console.log(" TODO POST /user", values);
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
  );
};
export default FieldLevelValidationExample;
