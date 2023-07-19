import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import api from "../../../config/api";
import "../styles/list.scss";

const CompanyList = ({ reload, handleSelectedCompany }: any) => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([{}]);
  const [selectedCompany, setSelectedCompany] = useState<any>();
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
    loadLazy(lazyParams);
  }, [reload, lazyParams]);

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

  const onPage = (event: any) => {
    console.log(event);
    setLazyParams(event);
  };
  return (
    <>
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
          selectionMode='single'
          selection={selectedCompany}
          onSelectionChange={(e) => { if(e.type === "row") {console.log('É row')} else{handleSelectedCompany(e.value)} setSelectedCompany(e.value)}}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
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
