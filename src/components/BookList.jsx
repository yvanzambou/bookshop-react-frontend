import { useEffect, useState } from "react";
import { getAllBooks, getAllGenres, getBooksByGenre } from "../api/bookService";
import BookCard from "./BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [search, setSearch] = useState("");
  const [loadingBooks, setLoadingBooks] = useState(false);

  useEffect(() => {
    getAllBooks()
      .then(data => setBooks(data))
      .catch(error => console.error("Fehler beim Laden der Bücher:", error));

    getAllGenres()
      .then(data => setGenres(data))
      .catch(error => console.error("Fehler beim Laden der Genres:", error));

    // Bücher laden
    loadBooks();
  }, []);

  function loadBooks(genre = "") {
    setLoadingBooks(true);
    const fetchFn = genre ? getBooksByGenre(genre) : getAllBooks();

    fetchFn
      .then(data => setBooks(data))
      .catch(err => console.error("Fehler beim Laden der Bücher:", err))
      .finally(() => setLoadingBooks(false));
  }

  function handleGenreChange(ev) {
    const genre = ev.target.value;
    setSelectedGenre(genre);
    loadBooks(genre);
  }

  function handleNameChange(ev) {
    setSearch(ev.target.value.toLowerCase());
  }

  // Bücher nach Name filtern
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search)
  );

  return (
    <div className="container my-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{selectedGenre == "" ? "Alle Bücher" : selectedGenre}</h2>
        <span className="badge bg-primary fs-4">
          {filteredBooks.length} Bücher
        </span>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* Dropdown ganz links */}
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="genreSelect" className="fw-semibold mb-0">Genre:</label>
          <select
            id="genreSelect"
            className="form-select w-auto"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">Alle Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.genre}>
                {g.genre}
              </option>
            ))}
          </select>
        </div>

        {/* Suchfeld ganz rechts */}
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="nameSearch" className="fw-semibold mb-0">Name:</label>
          <input
            id="nameSearch"
            type="text"
            className="form-control"
            style={{ width: "250px" }}
            placeholder="Buchtitel suchen..."
            value={search}
            onChange={handleNameChange}
          />
        </div>
      </div>

      <div className="row">
        {/* Bücher-Loader oder Bücherliste */}
        {loadingBooks ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Bücher werden geladen...</span>
            </div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <p>Keine Bücher gefunden.</p>
        ) : (
          <div className="row">
            {filteredBooks.map(book => (
              <div key={book.id} className="col-md-4 mb-4">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList