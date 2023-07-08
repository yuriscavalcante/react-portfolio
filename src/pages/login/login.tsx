import React, { useState } from "react";
import Card from "../../components/card";
import * as yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Campo requerido"),
      password: yup.string().min(8).required("Campo requerido"),
    }),
    onSubmit: (values: any) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Card>
      <h1>Login</h1>
      <form onSubmit={formikLogin.handleSubmit}>
        <ul className="list-group overflow-auto">
          <li>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="email form-control "
                id="email"
                placeholder="name@example.com"
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                value={formikLogin.values.email}
              />
              <label htmlFor="email">Email</label>
            </div>
            {formikLogin.touched.email && formikLogin.errors.email ? (
              <div>
                <a>O email deve ser válido</a>
              </div>
            ) : null}
          </li>
          <li>
            {" "}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control password"
                id="password"
                placeholder="Password"
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                value={formikLogin.values.password}
              />
              <label htmlFor="password">Senha</label>
            </div>
            {formikLogin.touched.password && formikLogin.errors.password ? (
              <div>
                <a>Senha deve ter no minimo 8 caracteres</a>
              </div>
            ) : null}
          </li>
        </ul>
        <button type="submit" className="btn btn-info">
          Entrar
        </button>
      </form>
    </Card>
  );
};

export default Login;
