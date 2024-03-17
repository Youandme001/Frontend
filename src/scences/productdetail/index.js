import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../components/firebase-config';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://192.168.1.193:4000/produit/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProduct(data.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addDoc(collection(db, 'panier'), {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: mainImageUrl,
      });

      toast.success('Product added to cart successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.error('Error adding product to cart: ', e);
      toast.error('Error adding product to cart.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const changeImage = (src) => {
    setMainImageUrl(src);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <main>
        <section className="product-description">
          <div className="product-image">
            <img src={mainImageUrl} alt={product.name} style={{ maxWidth: '300px', maxHeight: '300px' }} />
            <div className="image-options">
              {product.imageUrls && product.images.map((filepath, index) => (
                <button key={index} className="image-button" onClick={() => changeImage(filepath)}>
                  <img src={filepath} alt={`${product.name} Variant`} />
                </button>
              ))}
            </div>
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">Prix: {product.price} DT</p>
            <div className="description">
              <p>{product.description}</p>
              <p>Volume: {product.volume}</p>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Ajouter au panier</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetail;
