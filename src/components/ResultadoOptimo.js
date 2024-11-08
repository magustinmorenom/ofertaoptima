import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const ResultadoOptimo = ({ ofertas }) => {
  const [resultado, setResultado] = useState(null);

  const calcularMejorCombinacion = () => {
    // Aquí puedes agregar la lógica para calcular la combinación óptima
    let mejorPrecio = 0; // Ejemplo de costo mínimo calculado
    let combinacionOptima = {}; // Aquí puedes almacenar la combinación óptima de ofertas

    // Establece el resultado (esto es solo un ejemplo)
    setResultado({ mejorPrecio, combinacionOptima });
  };

  return (
    <Box mt={4}>
      <Button variant="contained" onClick={calcularMejorCombinacion}>Calcular Mejor Combinación</Button>
      {resultado && (
        <Box mt={2}>
          <Typography variant="h6">Mejor Precio Total: ${resultado.mejorPrecio}</Typography>
          {/* Mostrar la combinación óptima */}
          <Typography variant="subtitle1">Combinación Óptima:</Typography>
          {/* Aquí podrías iterar sobre combinacionOptima para mostrar cada nodo */}
        </Box>
      )}
    </Box>
  );
};

export default ResultadoOptimo;
