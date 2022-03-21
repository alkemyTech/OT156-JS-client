const validateEmail = (value) => {
  let error;
  if (!value) error = "Required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    error = "Invalid email address";
  return error;
};
const validateUsername = (value) => {
  let error;
  if (!value) error = "Required U";
  return error;
};
const validateLastName = (value) => {
  let error;
  if (!value) error = "Required L";
  return error;
};
const validatePassword = (value) => {
  let error;
  if (!value) error = "Required P";
  else if (value.length < 6)
    error = "Contraseña debe tener al menos 6 caracteres.";
  return error;
};
export { validateEmail, validateUsername, validateLastName, validatePassword };
