import {getProducts} from '../data/products';
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';
export default function home() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-subtitle">
          Discover amazing product at great prices
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our products</h2>
        <div className="product-grid">
          {products.map((product) => (
          <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
