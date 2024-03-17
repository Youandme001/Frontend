import React, { useState } from 'react';
import { db, storage } from '../../components/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; 
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload at least one image for the product');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('volume', volume);
    // Append each image to the FormData object
    for (const image of images) {
      formData.append('images', image);
    }

    try {
      // Send form data to the backend endpoint
      const response = await axios.post('http://192.168.1.193:4000/produit/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
      setName('');
      setPrice('');
      setImages([]);
      setDescription('');
      setVolume('');
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error(`Error adding product: ${error.message}`);
    }
  };
  return (
    <div className="main-content">
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            multiple // Allow multiple file selection
            onChange={(e) => setImages(Array.from(e.target.files))}
            accept="image/*"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Container>
    </div>
  );
};

export default ProductForm;
