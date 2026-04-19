import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import BookList from "./components/BookList.jsx";
import BookDetails from "./components/BookDetails.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* Standard-Route → zeigt alle Bücher */}
        <Route path="/books" element={<BookList />} />

        {/* Detailseite für ein einzelnes Buch */}
        <Route path="/book/:id" element={<BookDetails />} />

        {/* Root → automatisch weiterleiten auf /books */}
        <Route path="/" element={<Navigate to="/books" replace />} />

        {/* Fallback für nicht existierende Routen */}
        <Route path="*" element={<p className="m-4">Seite nicht gefunden.</p>} />

      </Routes>
    </Router>
  );
}

export default App;