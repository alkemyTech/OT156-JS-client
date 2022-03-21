import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
          // TODO
          console.log(" TODO POST /user", values);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="row g-3 align-items-center">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <Field name="email" />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="text-danger">{errors.email}</div>
                )}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name">Nombre</label>
              <Field name="name" />
              <ErrorMessage
                name="name"
                component={() => (
                  <div className="text-danger">{errors.name}</div>
                )}
              />
            </div>
            <label htmlFor="lastename">Apellido</label>

            <Field name="lastname" />
            <ErrorMessage
              name="lastname"
              component={() => (
                <div className="text-danger">{errors.lastname}</div>
              )}
            />
            <label htmlFor="password">Contraseña</label>

            <Field name="password" />
            <ErrorMessage
              name="password"
              component={() => (
                <div className="text-danger">{errors.password}</div>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default FieldLevelValidationExample;
