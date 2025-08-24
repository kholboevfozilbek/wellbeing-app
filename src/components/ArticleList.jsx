import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articlesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p><strong>Category:</strong> {article.category}</p>
              <p>{article.content}</p>
              <p><em>By {article.author} on {article.date}</em></p>
              {article.imageUrl && <img src={article.imageUrl} alt={article.title} style={{maxWidth: '200px'}} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;
