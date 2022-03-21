import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const FieldLevelValidationExample = () => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const initialForm = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };
  return (
    <div>
      <h1>Registrar</h1>
      <Formik
        initialValues={initialForm}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          Swal.fire("Enviado!", "", "success");
          // TODO
          console.log(" TODO POST /user", values);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <Field name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component={() => (
                  <div
                    className="invalid-feedback"
                    style={{ display: "inline" }}
                  >
                    {errors.name}
                  </div>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="lastename">
                Apellido
              </label>
              <Field name="lastname" className="form-control" />
              <ErrorMessage
                name="lastname"
                component={() => (
                  <div
                    className="invalid-feedback"
                    style={{ display: "inline" }}
                  >
                    {errors.lastname}
                  </div>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <Field name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component={() => (
                  <div
                    className="invalid-feedback"
                    style={{ display: "inline" }}
                  >
                    {errors.email}
                  </div>
                )}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <Field name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component={() => (
                  <div
                    className="invalid-feedback"
                    style={{ display: "inline" }}
                  >
                    {errors.password}
                  </div>
                )}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default FieldLevelValidationExample;
