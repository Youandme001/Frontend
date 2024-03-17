import React, { useState } from 'react';
import { db } from '../../components/firebase-config';
import { Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection, query, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import axios from 'axios'; // Import axios for making HTTP requests

const Commande = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    gouvernorat: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const panierQuery = query(collection(db, 'panier'));
      const panierSnapshot = await getDocs(panierQuery);
      const products = [];
      let totalPrice = 0;
  
      panierSnapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() };
        products.push(product);
        totalPrice += product.price;
      });
  
      const commandeData = {
        userId: 'userId', 
        produitId: 'produitId', 
        totalPrice,
      };
  
      await axios.post('http://192.168.1.193:4000/commande/create', commandeData);
  
      toast.success('Commande soumise avec succès!');
  
      panierSnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      navigate('/confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Erreur lors de la soumission de la commande.');
    }
  };
  

  const gouvernorats = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan',
    'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul',
    'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Commande
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prénom"
              name="firstName"
              fullWidth
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom de famille"
              name="lastName"
              fullWidth
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              name="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Adresse"
              name="address"
              fullWidth
              required
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gouvernorat"
              name="gouvernorat"
              fullWidth
              required
              value={formData.gouvernorat}
              onChange={handleChange}
            >
              {gouvernorats.map((gouvernorat) => (
                <MenuItem key={gouvernorat} value={gouvernorat}>
                  {gouvernorat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ville"
              name="city"
              fullWidth
              required
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Code postal"
              name="postalCode"
              fullWidth
              required
              value={formData.postalCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="tel"
              label="Numéro de téléphone"
              name="phone"
              fullWidth
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Soumettre la commande
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Commande;
