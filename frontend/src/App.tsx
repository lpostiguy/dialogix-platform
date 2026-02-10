import "./App.css";

import { Route, Routes } from "react-router-dom";

import { ChatPage } from "./pages/ChatPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import Footer from "./component/Footer";
import { LandingPage } from "./pages/LandingPage";
import { PlansPage } from "./pages/PlansPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout/:planId" element={<CheckoutPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
