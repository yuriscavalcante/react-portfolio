import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import MockedData from "../../../service/mockedData";
import "../../../styles/company/list.scss";
import api from "../../../config/api";

const CompanyList = ({ reload }: any) => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([{}]);
  const toast: any = useRef(null);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    page: 1,
    rows: 10,
    sortField: null,
    sortOrder: null,
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    loadLazy();
  }, [reload]);

  const loadLazy = async () => {
    setLoading(true);
    try {
      await api.get("/company").then((response: any) => {
        setCompanies(response.data.company);
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

  const onPage = (event: any) => {
    setLazyParams(event);
  };
  return (
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
      >
        <Column field="name" header="Nome"></Column>
        <Column field="acronym" header="Sigla"></Column>
        <Column field="cnpj" header="cnpj"></Column>
        <Column field="phoneNumber" header="Telefone"></Column>
        <Column field="email" header="E-mail"></Column>
      </DataTable>
    </div>
  );
};

export default CompanyList;
