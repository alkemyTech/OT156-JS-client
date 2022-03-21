import React from "react";
import { Formik, Form, Field } from "formik";
import {
  validateEmail,
  validateUsername,
  validateLastName,
  validatePassword,
} from "../utils/validations";

const FieldLevelValidationExample = () => {
  return (
    <div>
      <h1>Registrar</h1>
      <Formik
        initialValues={{
          username: "",
          lastname: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div class="row g-3 align-items-center">
              <label class="form-label" for="email">
                Email
              </label>
              <Field name="email" validate={validateEmail} />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </div>
            <div class="mb-3">
              <label for="username">Nombre</label>
              <Field name="username" validate={validateUsername} />
              {errors.username && touched.username && (
                <div>{errors.username}</div>
              )}
            </div>
            <label for="lastename">Apellido</label>

            <Field name="lastname" validate={validateLastName} />
            {errors.lastname && touched.lastname && (
              <div>{errors.lastname}</div>
            )}
            <label for="password">Contraseña</label>

            <Field name="password" validate={validatePassword} />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default FieldLevelValidationExample;
