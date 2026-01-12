import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CertificatePage from "./pages/CertificatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate" element={<CertificatePage />} />
      </Routes>
    </Router>
  );
}

export default App;