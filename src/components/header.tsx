import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

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
                <Button className="menu-item p-button-text">Empresa</Button>
              </Link>
            ) : null}
            <Link slot="end" to={"/login"}>
              <Button className="menu-item p-button-text">Passar</Button>
            </Link>
            <Link slot="end" to={"/login"}>
              <Button className="menu-item p-button-text">Passar</Button>
            </Link>
          </div>
        </Sidebar>
        <Button
          icon="pi pi-bars"
          className="p-button p-component p-button-text"
          onClick={() => setVisible(true)}
        />
      </div>
    </>
  );
};

export default Header;
