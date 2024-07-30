import { useState, useEffect } from "react";

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);

        const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const apiUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en`;
        const categoryParam = category ? `&topic=${category}` : "";
        const searchParam = searchTerm ? `&q=${searchTerm}` : "";
        const url = apiUrl + categoryParam + searchParam;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
};

export default useNewsData;
