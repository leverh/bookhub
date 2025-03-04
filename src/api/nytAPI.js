const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
const NYT_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/reviews.json';

export const fetchNYTReviews = async (title = "The Seven Moons of Maali Almeida") => {
    try {
        const response = await fetch(`${NYT_ENDPOINT}?title=${encodeURIComponent(title)}&api-key=${NYT_API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
}

export const fetchNYTTop10 = async () => {
    const NYT_TOP10_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
    try {
        const response = await fetch(`${NYT_TOP10_ENDPOINT}?api-key=${NYT_API_KEY}`);
        const data = await response.json();
        return data.results.books.slice(0, 10);  // Return only the top 10 books
    } catch (error) {
        throw error;
    }
}


