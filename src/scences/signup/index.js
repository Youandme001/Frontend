import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../components/firebase-config'; // Import your Firestore config

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    gouvernorat: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule et une lettre minuscule.');
      return;
    }
    try {
      // Save the user data to the "users" collection in Firestore (excluding the confirmPassword field)
      const { confirmPassword, ...userData } = formData;
      await addDoc(collection(db, 'users'), userData);
      toast.success('Compte créé avec succès!');
      navigate('/login'); // Navigate to the login page after successful sign-up
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Erreur lors de la création du compte.');
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
        Inscription
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
              type="password"
              label="Mot de passe"
              name="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Confirmer le mot de passe"
              name="confirmPassword"
              fullWidth
              required
              value={formData.confirmPassword}
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
              S'inscrire
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
