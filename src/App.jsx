import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Accueil from './pages/Accueil';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ArticleCreate from './pages/ArticleCreate';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Without this parent route, you would have to copy-paste <Navbar /> into every page! */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Accueil />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:id" element={<ArticleDetail />} />
        <Route path="nouveau" element={<ArticleCreate />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}