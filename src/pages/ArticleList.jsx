
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../sevices/api';

export default function ArticleList() {
  // 1. Declare states
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // 2. Fetch articles when component mounts
  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const res = await api.get('/articles');
        setArticles(res.data);
      } catch (err) {
        setError("Unable to load articles.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // 3. Filter articles by category
  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter(
          article => article.categorie === activeCategory
        );

  // 4. Conditional rendering
  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  // 5. Display articles
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
          Catalogue des Articles ({filteredArticles.length})
        </h2>

        <Link to="/nouveau" className="btn-primary">
          + Nouvel Article
        </Link>
      </div>

      {/* Category filter buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {["All", "Architecture", "Technology", "Database"].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '8px 14px',
              cursor: 'pointer',
              backgroundColor: activeCategory === category ? '#2563eb' : '#e2e8f0',
              color: activeCategory === category ? 'white' : 'black',
              border: 'none',
              borderRadius: '6px'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div className="card-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="card">
            <div>
              <span className="badge">{article.categorie}</span>

              <h3 style={{ fontSize: '1.2rem', margin: '10px 0 6px' }}>
                {article.titre}
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Auteur : {article.auteur}
              </p>

              <p style={{ marginTop: '10px', color: '#334155' }}>
                {article.contenu}
              </p>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #f1f5f9'
            }}>
              <Link
                to={`/articles/${article.id}`}
                style={{
                  color: '#2563eb',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Lire le detail &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty filter result */}
      {filteredArticles.length === 0 && (
        <p>Aucun article dans cette catégorie.</p>
      )}
    </div>
  );
}
