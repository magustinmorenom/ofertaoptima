import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider } from '@mui/material';
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

  useEffect(() => {
    document.body.style.background = 'linear-gradient(to bottom, lightgrey, turquoise)';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <Container maxWidth="xl" sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Ofertas de Licitación
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        {ofertas.map((oferta, index) => (
          <Box key={index} p={1} width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}>
            <Card variant="outlined">
              <CardContent>
                <OfertaItem oferta={oferta} />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Divider sx={{ marginY: 4 }} />

      <Card >
        <CardContent>
          <ResultadoOptimo ofertas={ofertas} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
