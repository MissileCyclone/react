import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
const [categories, setCategories] = useState([]);
const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedProduct, setSelectedProduct] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 10;
 
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);


  useEffect(() => {
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : 'https://fakestoreapi.com/products';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setCurrentPage(1);
      });
  }, [selectedCategory]);


  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };


  const closeModal = () => {
    setSelectedProduct(null);
  };


  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);


  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Магазин товаров</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="category" style={{ marginRight: '10px' }}>
          Фильтр по категории:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Все</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {currentProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => openProductDetails(product)}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              width: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '100%' }}
            />
            <h3 style={{ fontSize: '16px', margin: '10px 0' }}>
              {product.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Цена: ${product.price}
            </p>
            <p style={{ fontSize: '12px', color: '#888' }}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            style={{
              margin: '0 5px',
              padding: '10px 15px',
              backgroundColor: currentPage === pageNumber ? '#007bff' : '#f8f9fa',
              color: currentPage === pageNumber ? 'white' : '#007bff',
              border: '1px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '80%',
            maxWidth: '500px',
          }}
        >
          <h2>{selectedProduct.title}</h2>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
          />
          <p style={{ marginTop: '10px' }}>{selectedProduct.description}</p>
          <p>
            <strong>Цена:</strong> ${selectedProduct.price}
          </p>
          <p>
            <strong>Оценка:</strong> {selectedProduct.rating.rate} ({selectedProduct.rating.count} оценок)
          </p>
          <button
            onClick={closeModal}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Фон модального окна */}
      {selectedProduct && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default App;
