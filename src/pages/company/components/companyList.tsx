import { useFormik } from "formik";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import LoadingButton from "../../../components/loadingButton";
import Modal from "../../../components/modal";
import api from "../../../config/api";
import "../styles/list.scss";

const CompanyList = ({ reload, handleSelectedCompany }: any) => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([{}]);
  const toast: any = useRef(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [doubleSelectedCompany, setDoubleSelectedCompany] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    page: 1,
    rows: 10,
    sortField: null,
    sortOrder: null,
  });
  const [total, setTotal] = useState(0);

  const formikCompany = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: doubleSelectedCompany ? doubleSelectedCompany.name : "Aqui",
      acronym: doubleSelectedCompany ? doubleSelectedCompany.acronym : "",
      cnpj: doubleSelectedCompany ? doubleSelectedCompany.cnpj : "",
      phoneNumber: doubleSelectedCompany
        ? doubleSelectedCompany.phoneNumber
        : "",
      email: doubleSelectedCompany ? doubleSelectedCompany.email : "",
    },
    validationSchema: yup.object({
      name: yup.string(),
      acronym: yup.string(),
      cnpj: yup.string(),
      phone: yup.string(),
      email: yup.string().email(),
    }),
    onSubmit: async (values: any, { resetForm }) => {
      setLoading(true);
      try {
        setIsReload(true);
        await api
          .put(`/company/${doubleSelectedCompany.id}`, {
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
        setIsReload(false);
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

  useEffect(() => {
    loadLazy(lazyParams);
  }, [reload, lazyParams, isReload]);

  const loadLazy = async (params: any) => {
    setLoading(true);
    try {
      await api.get(`/company?skip=${params.first}`).then((response: any) => {
        setCompanies(response.data.list);
        setTotal(response.data.total);
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      return toast.current.show({
        severity: "error",
        detail: err.response.data.message,
      });
    }
  };

  const handleDoubleClick = (company: any) => {
    setDoubleSelectedCompany(company);
  };

  const handleChange = (display: boolean) => {
    setDisplayBasic(display);
  };

  const onPage = (event: any) => {
    setLazyParams(event);
  };
  return (
    <>
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
      <div className="list">
        <DataTable
          value={companies}
          lazy
          dataKey="id"
          paginator
          first={lazyParams.first}
          rows={10}
          totalRecords={total}
          onPage={onPage}
          loading={loading}
          selectionMode="single"
          selection={selectedCompany}
          onRowDoubleClick={(e) => {
            handleDoubleClick(e.data);

            handleChange(true);
          }}
          onSelectionChange={(e) => {
            setSelectedCompany(e.value);
          }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="name" header="Nome"></Column>
          <Column field="acronym" header="Sigla"></Column>
          <Column field="cnpj" header="cnpj"></Column>
          <Column field="phoneNumber" header="Telefone"></Column>
          <Column field="email" header="E-mail"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default CompanyList;
