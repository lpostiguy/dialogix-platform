import "./App.css";

import { Route, Routes } from "react-router-dom";

import { ChatPage } from "./pages/ChatPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import Footer from "./component/Footer";
import { PlansPage } from "./pages/PlansPage";

//import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PlansPage />} />
        <Route path="/checkout/:planId" element={<CheckoutPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
