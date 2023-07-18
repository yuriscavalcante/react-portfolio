import { useRef, useState } from "react";
import Modal from "../../components/modal";
import Header from "../../components/header";
import CompanyList from "./components/companyList";
import { Button } from "primereact/button";
import "./styles/company.scss";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "../../components/loadingButton";
import { Toast } from "primereact/toast";
import api from "../../config/api";

const Company = () => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const toast: any = useRef(null);
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
    onSubmit: async (values: any, { resetForm }) => {
      setLoading(true);
      try {
        setReload(true);
        await api
          .post("/company", {
            name: values.name,
            acronym: values.acronym,
            cnpj: values.cnpj,
            phoneNumber: values.phone,
            email: values.email,
          })
          .then((response: any) => {
            return toast.current.show({
              severity: "success",
              detail: response.data.message,
            });
          });
        resetForm({ values: "" });
        setLoading(false);
        setReload(false);
        setDisplayBasic(false);
      } catch (err: any) {
        setLoading(false);
        return toast.current.show({
          severity: "error",
          detail: err.response.data.message,
        });
      }
    },
  });

  const handleChange = (display: boolean) => {
    setDisplayBasic(display);
  };

  return (
    <>
      <Header></Header>
      <Toast ref={toast} position="top-left" />
      <div className="body">
        <Button
          className="primary"
          onClick={() => {
            setDisplayBasic(true);
          }}
        >
          Adicionar
        </Button>
        <CompanyList reload={reload}></CompanyList>
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
            loading={loading}
            label={"Salvar"}
            severity={"save"}
            form={"createForm"}
          />
        </div>
      </Modal>
    </>
  );
};

export default Company;
