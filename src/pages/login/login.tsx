import Card from "../../components/card";
import * as yup from "yup";
import { useFormik } from "formik";
import "../../styles/userForms.scss";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { useRef, useState } from "react";
import LoadingButton from "../../components/loadingButton";
import { Toast } from "primereact/toast";

const Login = () => {
  const toast: any = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Campo requerido"),
      password: yup.string().min(8).required("Campo requerido"),
    }),
    onSubmit: async (values: any, { resetForm }) => {
      setLoading(true);
      try {
        await api
          .post("/user/login", {
            email: values.email,
            password: values.password,
          })
          .then((response: any) => {
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
          });
        resetForm({ values: "" });
        setLoading(false);
        navigate("/home");
      } catch (err: any) {
        console.log(err);
        setLoading(false);
        return toast.current.show({
          severity: "error",
          detail: err.response.data.message,
        });
      }
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
        <LoadingButton loading={loading} label={"Entrar"} />
      </form>
      <Toast ref={toast} position="top-left" />
    </Card>
  );
};

export default Login;
