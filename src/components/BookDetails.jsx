import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById, formatEuroDE } from "../api/bookService";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookById(id)
      .then(data => setBook(data))
      .catch(err => console.error("Fehler beim Laden des Buches:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (!book) {
    return <p className="text-muted">Buch nicht gefunden.</p>;
  }

  return (
    <div className="container py-5">

      {/* Zurück-Link */}
      <Link to="/books" className="text-decoration-none">
        ← Zurück zur Übersicht
      </Link>

      {/* Hauptkarte */}
      <div className="card mt-4 shadow-sm">
        <div className="row g-0">

          {/* Buchcover */}
          <div className="col-md-4 d-flex justify-content-center align-items-center p-4">
            <img
              src={book.coverImg}
              alt={book.title}
              className="img-fluid shadow-sm"
              style={{
                borderRadius: "8px",
                maxHeight: "350px",
                objectFit: "cover"
              }}
            />
          </div>

          {/* Buchinfos */}
          <div className="col-md-8 p-4">
            <h2 className="fw-bold mb-2">{book.title}</h2>

            <p className="text-muted mb-1">
              von <span className="fw-semibold">{book.author}</span>
            </p>

            <div>
              {book.genres.map(g => (
                <span key={g.id} className="badge bg-secondary mb-2">
                  {g.genre}
                </span>
              ))}
            </div>

            <p className="mt-3">{book.description}</p>

            <h4 className="fw-bold mt-4">
              {formatEuroDE(book.price)}
            </h4>

            {/* Add to Cart Button */}
            <button className="btn btn-dark mt-3">
              In den Warenkorb
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookDetails;