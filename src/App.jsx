import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import NotificationToast from './components/NotificationToast';


export default function App() {
  const { theme } = useContext(ThemeContext);

  // La classe "light" ou "dark" choisit les couleurs définies dans index.css
  return (
    <div className={`app-shell ${theme}`}>
    <NotificationToast />
     <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="store-layout">
            <section className="product-section">
              <div className="section-title-box"><h3>Products</h3></div>
              <ProductList />
            </section>
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
}
