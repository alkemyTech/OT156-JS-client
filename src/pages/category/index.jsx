import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import Loader from '../../components/Loader/Loader';

const Category = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryEdit, setCategoryEdit] = useState({});
  const [sendComplete, setSendComplete] = useState({
    error: false,
    success: false,
    msg: '',
  });

  const getCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/categories/`);
      const data = await res.data;
      setCategoryEdit(data);
      setSendComplete({ success: true, msg: data });
    } catch (error) {
      setSendComplete({ error: true, msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:4000/categories`, data);
      console.log(res);
      const dataRes = await res.data;
      setSendComplete({ success: true, msg: dataRes });
    } catch (error) {
      setSendComplete({ error: true, msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:4000/categories/${id}`,
        data
      );
      const dataRes = await res.data;
      setSendComplete({ success: true, msg: dataRes });
    } catch (error) {
      setSendComplete({ error: true, msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getCategory().catch(null);
    setLoading(false);
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      <Formik
        initialValues={{
          name: categoryEdit.name ?? '',
          description: categoryEdit.descrition ?? '',
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = 'Ingresa un nombre';
          } else if (
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.name)
          ) {
            errors.name = 'Ingresa un nombre válido';
          }

          if (
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.description
            )
          ) {
            errors.description = 'Ingresa una descripcion válida';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const { name, description } = values;
          const data = {
            name,
            description,
          };
          id
            ? updateCategory(data).catch(null)
            : createCategory(data).catch(null);
          resetForm();
        }}
      >
        {({ errors, handleChange, values, handleBlur, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="container-sm mt-5 border border-1 rounded-3 p-3 w-50"
            sm="auto"
          >
            <Form.Group className="mb-3">
              <Form.Label controlid="name">Categoria</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ingrese un nombre"
                controlid="name"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
              />
              <Form.Text className="text-muted">
                <ErrorMessage
                  name="name"
                  component={() => <p className="text-danger">{errors.name}</p>}
                />
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label controlid="description">Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Ingrese su descripcion"
                controlid="description"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
              />
              <Form.Text className="text-muted">
                <ErrorMessage
                  name="description"
                  component={() => (
                    <p className="text-danger">{errors.description}</p>
                  )}
                />
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              {id ? 'Editar categoria' : 'Agregar nueva categoria'}
            </Button>
            {sendComplete.error && (
              <ErrorAlert title={sendComplete.msg}>
                {setSendComplete({ error: false })}
              </ErrorAlert>
            )}
            {sendComplete.success && (
              <SuccessAlert title={sendComplete.msg}>
                {setSendComplete({ success: false })}
              </SuccessAlert>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Category;
