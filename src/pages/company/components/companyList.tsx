import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import MockedData from "../../../service/mockedData";
import "../../../styles/company/list.scss";

const CompanyList = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([{}]);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    page: 1,
    rows: 5,
    sortField: null,
    sortOrder: null,
  });
  const [total, setTotal] = useState(0);
  let loadLazyTimeout = null;

  const companiesService = new MockedData();
  useEffect(() => {
    loadLazy();
  }, []);

  const loadLazy = () => {
    setLoading(true);
    loadLazyTimeout = setTimeout(() => {
      const getcompanies = companiesService.getCompanies(lazyParams);
      setCompanies(getcompanies.companies);
      setTotal(getcompanies.total);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  const onPage = (event: any) => {
    setLoading(true);
    setLazyParams(event);

    loadLazyTimeout = setTimeout(() => {
      const getcompanies = companiesService.getCompanies(lazyParams);
      setCompanies(getcompanies.companies);
      setTotal(getcompanies.total);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };
  return (
    <div className="list">
      <DataTable
        value={companies}
        lazy
        dataKey="id"
        paginator
        first={lazyParams.first}
        rows={5}
        totalRecords={total}
        onPage={onPage}
        loading={loading}
      >
        <Column field="company_name" header="Nome"></Column>
        <Column field="acronym" header="Sigla"></Column>
        <Column field="cnpj" header="cnpj"></Column>
        <Column field="phone" header="Telefone"></Column>
        <Column field="email" header="E-mail"></Column>
      </DataTable>
    </div>
  );
};

export default CompanyList;
