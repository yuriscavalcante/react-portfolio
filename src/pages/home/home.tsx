import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "../../styles/home.scss";
import Login from "../login/login";
import Header from "../../components/header";
const Home = () => {
  return (
    <>
      <Header></Header>
      <div className="body"></div>
    </>
  );
};

export default Home;
