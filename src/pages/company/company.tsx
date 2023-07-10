import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import Header from "../../components/header";
import MockedData from "../../service/mockedData";
import CompanyList from "./components/companyList";

const Company = () => {
  
 
  return (
    <>
      <Header></Header>
      <div className="body">
        <CompanyList></CompanyList>
      </div>
      <Modal displayBasic={false}></Modal>
    </>
  );
};

export default Company;
