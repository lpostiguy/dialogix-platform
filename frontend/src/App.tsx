import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LandingPage } from "./pages/LandingPage";
import { PlansPage } from "./pages/PlansPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/checkout/:planId" element={<CheckoutPage />} />
      <Route path="/plans" element={<PlansPage />} />
    </Routes>
  );
}

export default App;
