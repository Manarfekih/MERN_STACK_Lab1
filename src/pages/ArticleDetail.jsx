
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../sevices/api';

export default function ArticleDetail() {
  // 1. Get article ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Declare states
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch the article
  useEffect(() => {
    async function fetchOne() {
      try {
        setLoading(true);
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        setError("Unable to load article.");
      } finally {
        setLoading(false);
      }
    }

    fetchOne();
  }, [id]);

  // 4. Delete the article
  const handleDelete = async () => {
  try {
    await api.delete(`/articles/${id}`);
    navigate("/articles");
  } catch (err) {
    console.error("Unable to delete article:", err);
  }
};

  // 5. Conditional rendering
  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!article) return <p>Article not found.</p>;

  // 6. Display article details
  return (
    <article style={{
      background: 'white',
      padding: '24px',
      borderRadius: '12px'
    }}>
      <span className="badge">{article.categorie}</span>

      <h1>{article.titre}</h1>

      <p>{article.contenu}</p>

      <Link to="/articles">← Back to list</Link>

      <button
        onClick={handleDelete}
        style={{
          marginLeft: '15px',
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '8px 14px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Delete Article
      </button>
    </article>
  );
}
