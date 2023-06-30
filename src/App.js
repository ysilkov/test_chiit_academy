import "./App.css";
import CarActionsDelete from "./components/CarActionsDelete";
import CarActionsEdit from "./components/CarActionsEdit";
import { BrowserRouter } from "react-router-dom";
import CarTable from "./components/CarTable";
import { Routes, Route } from "react-router-dom";
import AddCarModal from "./components/AddCarModal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarTable />} />
          <Route path="/delete/:id" element={<CarActionsDelete />} />
          <Route path="/edit/:id" element={<CarActionsEdit />} />
          <Route path="/add" element={<AddCarModal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
