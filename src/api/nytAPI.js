const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

const NYT_OVERVIEW_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/overview.json';

export const fetchNYTOverviewLists = async () => {
    try {
        const response = await fetch(`${NYT_OVERVIEW_ENDPOINT}?api-key=${NYT_API_KEY}`);
        const data = await response.json();
        return data.results.lists;
    } catch (error) {
        throw error;
    }
};

export const fetchNYTTop10 = async () => {
    const NYT_TOP10_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
    try {
        const response = await fetch(`${NYT_TOP10_ENDPOINT}?api-key=${NYT_API_KEY}`);
        const data = await response.json();
        return data.results.books.slice(0, 10);
    } catch (error) {
        throw error;
    }
};
