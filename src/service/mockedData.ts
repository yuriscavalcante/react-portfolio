export default class MockedData {
  getCompanies(query: any) {
    const companies = [
      {
        id: 1,
        company_name: "Silva e Pelaquim Associados LTDA",
        acronym: "SPA",
        cnpj: "26315031000125",
        phone: "82920349151",
        email: "emailteste1@email.com",
      },
      {
        id: 2,
        company_name: "Silva e Pelaquim Associados LTDA 2",
        acronym: "SPA2",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste2@email.com",
      },
      {
        id: 3,
        company_name: "Silva e Pelaquim Associados LTDA 3",
        acronym: "SPA3",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste3@email.com",
      },
      {
        id: 4,
        company_name: "Silva e Pelaquim Associados LTDA 4",
        acronym: "SPA4",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste4@email.com",
      },
      {
        id: 5,
        company_name: "Silva e Pelaquim Associados LTDA 5",
        acronym: "SPA5",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste5@email.com",
      },
      {
        id: 6,
        company_name: "Silva e Pelaquim Associados LTDA 6",
        acronym: "SPA6",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste6@email.com",
      },
      {
        id: 7,
        company_name: "Silva e Pelaquim Associados LTDA 7",
        acronym: "SPA7",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste7@email.com",
      },
      {
        id: 8,
        company_name: "Silva e Pelaquim Associados LTDA 8",
        acronym: "SPA8",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste8@email.com",
      },
      {
        id: 9,
        company_name: "Silva e Pelaquim Associados LTDA 9",
        acronym: "SPA9",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste9@email.com",
      },
      {
        id: 10,
        company_name: "Silva e Pelaquim Associados LTDA 10",
        acronym: "SPA10",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste10@email.com",
      },
      {
        id: 11,
        company_name: "Silva e Pelaquim Associados LTDA 11",
        acronym: "SPA11",
        cnpj: "98781948000126",
        phone: "1692843-2855",
        email: "emailteste11@email.com",
      },
    ];
    return {
      companies: companies.slice(query.first, query.first + 10),
      total: companies.length,
    };
  }

  getRoles(query: any) {
    const roles = [
      {
        id: 1,
        company: 1,
        name: "Admin",
        description: "Cargo de administrador",
      },
      {
        id: 2,
        company: 2,
        name: "RH",
        description: "Cargo de RH",
      },
      {
        id: 3,
        company: 1,
        name: "RH",
        description: "Cargo de RH",
      },
      {
        id: 4,
        company: 1,
        name: "TI",
        description: "Cargo de TI",
      },
    ];

    return roles.filter((res) => {
      return res.company === query.company;
    });
  }
}
