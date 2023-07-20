import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import * as yup from "yup";
import Header from "../../components/header";
import LoadingButton from "../../components/loadingButton";
import Modal from "../../components/modal";
import api from "../../config/api";
import CompanyList from "./components/companyList";
import "./styles/company.scss";

const Company = () => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const toast: any = useRef(null);
  const formikCompany = useFormik({
    initialValues: {
      name: "",
      acronym: "",
      cnpj: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Campo requerido"),
      acronym: yup.string(),
      cnpj: yup.string().required("Campo requerido"),
      phoneNumber: yup.string().required("Campo requerido"),
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
            phoneNumber: values.phoneNumber,
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

  const handleSelectedCompany = (company: any) => {
    setSelectedCompany(company);
  };

  const deleteCompanies = async (companies: any) => {
    setLoading(true);
    try {
      setReload(true);
      for (let c of companies) {
        await api.delete(`company/${c.id}`).then((response: any) => {
          return toast.current.show({
            severity: "success",
            detail: response.data.message,
          });
        });
      }

      setLoading(false);
      setReload(false);
    } catch (err: any) {
      setLoading(false);
      return toast.current.show({
        severity: "error",
        detail: err.response.data.message,
      });
    }
  };

  return (
    <>
      <Header></Header>
      <Toast ref={toast} position="top-left" />
      <div className="body">
        <div className="buttons">
          <Button
            className="primary"
            onClick={() => {
              setDisplayBasic(true);
            }}
          >
            <i className="pi pi-plus" style={{ fontSize: "1.4rem" }}></i>
          </Button>
          <Button
            className="danger"
            onClick={() => {
              deleteCompanies(selectedCompany);
            }}
          >
            {loading ? (
              <ProgressSpinner style={{ width: "25px", height: "25px" }} />
            ) : (
              <i className="pi pi-trash" style={{ fontSize: "1.4rem" }}></i>
            )}
          </Button>
        </div>
        <CompanyList
          reload={reload}
          handleSelectedCompany={handleSelectedCompany}
        ></CompanyList>
      </div>
      <Modal
        handleChange={handleChange}
        displayBasic={displayBasic}
        method={"Adicionar uma empresa"}
      >
        <div className="forms">
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
                    id="phoneNumber"
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                    value={formikCompany.values.phoneNumber}
                  />
                  <label htmlFor="lefticon">Telefone</label>
                </span>
              </div>
              {formikCompany.touched.phoneNumber &&
              formikCompany.errors.phoneNumber ? (
                <div>
                  <a>{String(formikCompany.errors.phoneNumber)}</a>
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
