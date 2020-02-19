import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, validationSchema } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const UserForms = props => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (props.status) {
      setUser([...user, props.status]);
    }
  }, [props.status]);

  //form layout

  return (
    <div className="user-form">
      <Form>
        {" "}
        On Boarding Form
        <Field type="text" name="name" placeholder="Name" />
        {props.touched.name && props.errors.name && (
          <p className="error">{props.errors.name}</p>
        )}
        <Field type="text" name="email" placeholder="Email Address" />
        {props.touched.email && props.errors.email && (
          <p className="error">{props.errors.email}</p>
        )}
        <Field type="text" name="password" placeholder="New Password" />
        {props.touched.password && props.errors.password && (
          <p className="error">{props.errors.password}</p>
        )}
        <Field component="select" name="region" className="sumbit-select">
          <option>Select Region</option>
          <option value="eastcoast">East Coast</option>
          <option value="westcoast">West Coast</option>
          <option value="midwest">Mid-West</option>
          <option value="south">South</option>
        </Field>
        <label className="checkbox-container">
          <Field type="checkbox" name="terms" checked={props.values.terms} />
          Terms of Service
          <span className="checkmark" />
        </label>
        <Field
          component="textarea"
          type="text"
          name="medical"
          placeholder="Add any medical conditions"
          checked={props.values.medical}
        />
        <button type="submit">Submit!</button>
      </Form>
      {user.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>New Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
};

// a component is a function that takes a prop param
// and returns JSX

// a HOC is a function that takes a component function as a param
// and returns a new component function

const mappingProps = props => {
  const userObjects = {
    name: props.name || "",
    email: props.email || "",
    password: props.password || "",
    terms: props.terms || true,
    medical: props.medical || ""
  };
  return userObjects;
};

const handleSubmit = (values, { setStatus }) => {
  console.log("submit test");
  Axios.post("https://reqres.in/api/users/", values)
    .then(res => {
      console.log(res.data);
      setStatus(res.data);
    })
    .catch(err => {
      console.log(err)
    });
};

// let yupSchema = Yup.object().shape({
//   name: Yup.string().requried("Please enter your name"),
//   email: Yup.string().requried("Please enter your email"),
//   password: Yup.string().requried("Please enter your password")
// });
let yupSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  password: Yup.string()
});

const formikObj = {
  mappedProps: mappingProps,
  handledSubmit: handleSubmit,
  validationSchema: yupSchema
};

const FinalFormHOC = withFormik(formikObj);
const FinalUserForm = FinalFormHOC(UserForms);

export default FinalUserForm;
