import React from "react";
import "../styles/userForms.scss";
const Card = ({ children }: any) => {
  return (
    <div className="container text-center">
      <div className="forms">
        <img src="./react.svg" alt="companyLogo" />
        {children}
      </div>
    </div>
  );
};
export default Card;
