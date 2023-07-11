import { useState } from "react";
import Modal from "../../components/modal";
import Header from "../../components/header";
import CompanyList from "../../components/company/companyList";
import { Button } from "primereact/button";
import "../../styles/company.scss";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "../../components/loadingButton";

const Company = () => {
  const [displayBasic, setDisplayBasic] = useState(false);

  const formikCompany = useFormik({
    initialValues: {
      name: "",
      acronym: "",
      cnpj: "",
      phone: "",
      email: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Campo requerido"),
      acronym: yup.string(),
      cnpj: yup.string().required("Campo requerido"),
      phone: yup.string().required("Campo requerido"),
      email: yup.string().email().required("Campo requerido"),
    }),
    onSubmit: (values: any, { resetForm }) => {
      console.log(values);
      resetForm({ values: "" });
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (display: boolean) => {
    setDisplayBasic(display);
  };

  return (
    <>
      <Header></Header>
      <div className="body">
        <Button
          className="newCompany"
          severity="success"
          onClick={() => {
            setDisplayBasic(true);
          }}
        >
          Adicionar
        </Button>
        <CompanyList></CompanyList>
      </div>
      <Modal
        handleChange={handleChange}
        displayBasic={displayBasic}
        method={"Adicionar uma empresa"}
      >
        <div className="teste">
          <form
            onSubmit={formikCompany.handleSubmit}
            className="form"
            id="createForm"
          >
            <div className="row">
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                    value={formikCompany.values.name}
                  />
                  <label htmlFor="name">Nome Empresarial</label>
                </span>
              </div>
              {formikCompany.touched.name && formikCompany.errors.name ? (
                <div>
                  <a>{String(formikCompany.errors.name)}</a>
                </div>
              ) : null}
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputText
                    id="acronym"
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                    value={formikCompany.values.acronym}
                  />
                  <label htmlFor="acronym">Sigla</label>
                </span>
              </div>
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputMask
                    mask="99.999.999/9999-99"
                    id="cnpj"
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                    value={formikCompany.values.cnpj}
                  />
                  <label htmlFor="cnpj">CNPJ</label>
                </span>
              </div>
              {formikCompany.touched.cnpj && formikCompany.errors.cnpj ? (
                <div>
                  <a>{String(formikCompany.errors.cnpj)}</a>
                </div>
              ) : null}
            </div>
            <div className="row">
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputText
                    type="email"
                    id="email"
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                    value={formikCompany.values.email}
                  />
                  <label htmlFor="inputtext">Email</label>
                </span>
              </div>
              {formikCompany.touched.email && formikCompany.errors.email ? (
                <div>
                  <a>{String(formikCompany.errors.email)}</a>
                </div>
              ) : null}
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputMask
                    mask="(99)9999-9999"
                    id="phone"
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                    value={formikCompany.values.phone}
                  />
                  <label htmlFor="lefticon">Telefone</label>
                </span>
              </div>
              {formikCompany.touched.phone && formikCompany.errors.phone ? (
                <div>
                  <a>{String(formikCompany.errors.phone)}</a>
                </div>
              ) : null}
            </div>
          </form>
          <LoadingButton
            label={"Salvar"}
            severity={"success"}
            form={"createForm"}
          />
        </div>
      </Modal>
    </>
  );
};

export default Company;
