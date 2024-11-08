import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import OfertaItem from './components/OfertaItem';
import ResultadoOptimo from './components/ResultadoOptimo';

const App = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    // Cargar el archivo JSON de ./data/ofertas.json
    fetch('./data/ofertas.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
      })
      .then(data => setOfertas(data.ofertas))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Ofertas de Licitación
      </Typography>

      <Grid container spacing={2}>
        {ofertas.map((oferta, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card variant="outlined">
              <CardContent>
                <OfertaItem oferta={oferta} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginY: 4 }} />

      <ResultadoOptimo ofertas={ofertas} />
    </Container>
  );
};

export default App;
