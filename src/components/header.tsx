import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const Header = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="menu">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div className="buttons">
            <Link to={"/company"}>
              <Button className="menu-item p-button-text">Empresa</Button>
            </Link>
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
