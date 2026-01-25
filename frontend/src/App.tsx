import "./App.css";

import { Route, Routes } from "react-router-dom";

import { CheckoutPage } from "./pages/CheckoutPage";
import { PlansPage } from "./pages/PlansPage";

//import { LandingPage } from "./pages/LandingPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<PlansPage />} />
      <Route path="/checkout/:planId" element={<CheckoutPage />} />
      <Route path="/plans" element={<PlansPage />} />
    </Routes>
  );
}

export default App;
