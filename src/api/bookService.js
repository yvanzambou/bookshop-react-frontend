import axios from 'axios';

const API_URL = "http://localhost:8080/booki-booki";

export async function getAllBooks() {
    const res = await axios.get(`${API_URL}/books`);
    return res.data;
}

export async function getAllGenres() {
    const res = await axios.get(`${API_URL}/genres`);
    return res.data;
}

export async function getBooksByGenre(genre) {
    const res = await axios.get(`${API_URL}/books/${genre}`);
    return res.data;
}

export async function getBookById(id) {
  const res = await axios.get(`${API_URL}/book/${id}`);
  return res.data;
}


export function formatEuroDE(amount) {
    const formatted = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
    return formatted;
}