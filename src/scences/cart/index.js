import React, { useState, useEffect } from 'react';
import { db } from '../../components/firebase-config';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Card, CardContent, Typography, Button, Grid, Container, CardActions, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'panier'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const handleDelete = async (itemId) => {
    console.log('Deleting item with ID:', itemId);
    try {
      const itemRef = doc(db, 'panier', itemId);
      console.log('Item reference:', itemRef);
      await deleteDoc(itemRef);
      toast.success('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item: ', error.message);
      toast.error(`Error removing item: ${error.message}`);
    }
  };
  
  

  return (
    <Container sx={{ marginTop: '100px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map(item => (
            <Card key={item.id} sx={{ display: 'flex', marginBottom: '20px' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body1">Prix: {item.price} DT</Typography>
                <CardActions>
                  <IconButton onClick={() => handleDelete(item.id)} color="error">
                    <DeleteIcon />
                    Supprimer
                  </IconButton>
                </CardActions>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.imageUrl}
                alt={item.name}
              />
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">RÉSUMÉ DU PANIER</Typography>
              <Typography variant="body1">Sous-total: {calculateSubtotal()} DT</Typography>
              <Button
  variant="contained"
  color="primary"
  sx={{ marginTop: '20px' }}
  onClick={() => navigate('/commande')}
>
  Commander
</Button>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
