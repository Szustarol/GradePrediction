import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formularz from "./Formularz";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/" element={<Formularz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
