import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login";
import Products from "../components/product";
import Error404 from "../components/error404";

const Routing = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;