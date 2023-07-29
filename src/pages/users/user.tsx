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
import "./styles/user.scss";
import UserList from "./components/usersList";

const User = () => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const toast: any = useRef(null);
  const formikUser = useFormik({
    initialValues: {
      name: "",
      isAdmin: false,
      documents: "",
      password: "",
      confirmPassword: "",
      email: "",
      company: [],
      birthDate: "",
      phoneNumber: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Campo requerido"),
      isAdmin: yup.boolean().required("Campo requerido"),
      documents: yup.string().required("Campo requerido"),
      password: yup.string().email().required("Campo requerido"),
      confirmPassword: yup.string().email().required("Campo requerido"),
      email: yup.string().email().required("Campo requerido"),
      company: yup.array(),
      birthDate: yup.string(),
      phoneNumber: yup.string(),
    }),
    onSubmit: async (values: any, { resetForm }) => {
      setLoading(true);
      try {
        setReload(true);
        await api
          .post("/user", {
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

  const handleSelectedUser = (user: any) => {
    setSelectedUser(user);
  };

  const deleteCompanies = async (companies: Array<any>) => {
    setLoading(true);
    if (!companies) {
      setLoading(false);
      return toast.current.show({
        severity: "warn",
        detail: "Selecione pelo menos uma empresa!",
      });
    }
    try {
      setReload(true);
      for (let c of companies) {
        await api.delete(`user/${c.id}`).then((response: any) => {
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
              deleteCompanies(selectedUser);
            }}
          >
            {loading ? (
              <ProgressSpinner style={{ width: "25px", height: "25px" }} />
            ) : (
              <i className="pi pi-trash" style={{ fontSize: "1.4rem" }}></i>
            )}
          </Button>
        </div>
        <UserList
          reload={reload}
          handleSelectedUser={handleSelectedUser}
        ></UserList>
      </div>
      <Modal
        handleChange={handleChange}
        displayBasic={displayBasic}
        method={"Adicionar uma empresa"}
      >
        <div className="forms">
          <form
            onSubmit={formikUser.handleSubmit}
            className="form"
            id="createForm"
          >
            <div className="row">
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    value={formikUser.values.name}
                  />
                  <label htmlFor="name">Nome Completo</label>
                </span>
              </div>
              {formikUser.touched.name && formikUser.errors.name ? (
                <div>
                  <a>{String(formikUser.errors.name)}</a>
                </div>
              ) : null}
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputMask
                    mask={
                      formikUser.values.documents?.length === 11
                        ? "999.999.999-99"
                        : "99.999.999/9999-99"
                    }
                    id="documents"
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    value={formikUser.values.documents}
                  />
                  <label htmlFor="documents">Documents</label>
                </span>
              </div>
              {formikUser.touched.cnpj && formikUser.errors.cnpj ? (
                <div>
                  <a>{String(formikUser.errors.cnpj)}</a>
                </div>
              ) : null}
            </div>
            <div className="row">
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputText
                    type="email"
                    id="email"
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    value={formikUser.values.email}
                  />
                  <label htmlFor="inputtext">Email</label>
                </span>
              </div>
              {formikUser.touched.email && formikUser.errors.email ? (
                <div>
                  <a>{String(formikUser.errors.email)}</a>
                </div>
              ) : null}
              <div className="field col-12 ">
                <span className="p-float-label">
                  <InputMask
                    mask="(99)9999-9999"
                    id="phoneNumber"
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    value={formikUser.values.phoneNumber}
                  />
                  <label htmlFor="lefticon">Telefone</label>
                </span>
              </div>
              {formikUser.touched.phoneNumber &&
              formikUser.errors.phoneNumber ? (
                <div>
                  <a>{String(formikUser.errors.phoneNumber)}</a>
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

export default User;
