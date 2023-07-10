import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

const Employees = () => {
  const formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      branchs: [],
      roles: [],
      documents: "",
      birthDate: "",
      phone: "",
      departments: [],
    },
    validationSchema: yup.object({
      name: yup.string().min(1).required("O campo é obrigatório"),
      email: yup.string().email().required("O campo é obrigatório"),
      password: yup.string().min(8).max(20).required("O campo é obrigatório"),
      confirmPassword: yup
        .string()
        .min(8)
        .max(20)
        .required("O campo é obrigatório"),
      company: yup.string().required("O campo é obrigatório"),
      branchs: yup.array(),
      roles: yup.array(),
      documents: yup.string().required().min(11).max(14),
      birthDate: yup.date().min("2005-01-01"),
      phone: yup.string(),
      departments: yup.array(),
    }),
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return <div>Employees</div>;
};

export default Employees;
