import React, { useState, useEffect } from 'react';
import { Container, Typography, List, Divider } from '@mui/material';
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
    <Container>
      <Typography variant="h4" gutterBottom>Ofertas de Licitación</Typography>
      <List>
        {ofertas.map((oferta, index) => (
          <div key={index}>
            <OfertaItem oferta={oferta} />
            <Divider />
          </div>
        ))}
      </List>
      <ResultadoOptimo ofertas={ofertas} />
    </Container>
  );
};

export default App;
