import React, { useState } from "react";
import Card from "../../components/card";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleIsRegister = (option: boolean) => {
    setIsRegister(option);
  };

  return (
    <Card>
      {isRegister ? (
        <>
          <h1>Cadastre-se</h1>
          <form>
            <ul className="list-group overflow-auto">
              <li>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
              </li>
              <li>
                {" "}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Senha"
                  />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>
              </li>
              <li>
                {" "}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingCPassword"
                    placeholder="Confirmar Senha"
                  />
                  <label htmlFor="floatingCPassword">Confirmar Senha</label>
                </div>
              </li>
              <li>
                {" "}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Nome"
                  />
                  <label htmlFor="floatingName">Nome</label>
                </div>
              </li>
            </ul>
            <button type="button" className="btn btn-info">
              Entrar
            </button>
          </form>
          <label>
            Já tem conta?{" "}
            <a
              onClick={() => {
                handleIsRegister(false);
              }}
            >
              Entre!
            </a>
          </label>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <form>
            <ul className="list-group overflow-auto">
              <li>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
              </li>
              <li>
                {" "}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>
              </li>
            </ul>
            <button type="button" className="btn btn-info">
              Entrar
            </button>
          </form>
          <label>
            Não tem conta?{" "}
            <a
              onClick={() => {
                handleIsRegister(true);
              }}
            >
              Cadastre-se
            </a>
          </label>
        </>
      )}
    </Card>
  );
};

export default Login;
