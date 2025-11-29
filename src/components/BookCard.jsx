export default function BookCard({ book }) {
	return (
		<div className="card h-100 shadow-sm text-center pt-2">
			<img
				src={book.coverImg}
				alt={book.title}
				className="card-img-top img-fluid mx-auto d-block"
				style={{ height: "300px", width: "200px" }}
			/>
			<div className="card-body">
				<h5 className="card-title">{book.title}</h5>
				<p className="card-text text-muted">{book.author}</p>
				{/* <p>
					<strong>Genres:</strong>{" "}
					{book.genres.map((g) => g.genre).join(", ")}
				</p> */}
			</div>
		</div>
	);
}