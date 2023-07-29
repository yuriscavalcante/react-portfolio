import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const user = JSON.parse(String(sessionStorage.getItem("user")));

  return (
    <>
      <div className="menu">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div className="buttons">
            {user.user.isAdmin ? (
              <Link to={"/company"}>
                <Button className="menu-item p-button-text">Empresas</Button>
              </Link>
            ) : null}
            <Link to={"/users"}>
              <Button className="menu-item p-button-text">Usuarios</Button>
            </Link>
            <Link to={"/login"}>
              <Button className="menu-item p-button-text">Passar</Button>
            </Link>
          </div>
        </Sidebar>
        <Button
          icon="pi pi-bars"
          className="p-button p-component p-button-text"
          onClick={() => setVisible(true)}
        />
        <h3>Aqui</h3>
      </div>
    </>
  );
};

export default Header;
