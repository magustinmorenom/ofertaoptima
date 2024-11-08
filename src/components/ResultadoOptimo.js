import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const ResultadoOptimo = ({ ofertas }) => {
  const [resultado, setResultado] = useState(null);

  const calcularMejorCombinacion = () => {
    const nodos = ['A', 'B', 'C', 'D', 'E'];
    const combinaciones = [];
    const precioMinimoPorNodo = {};

    // 1. Crear un mapa con el precio mínimo individual para cada nodo
    nodos.forEach(nodo => {
      let precioMinimo = Infinity;
      ofertas.forEach(oferta => {
        if (oferta.ofertas_individuales[nodo] < precioMinimo) {
          precioMinimo = oferta.ofertas_individuales[nodo];
        }
      });
      precioMinimoPorNodo[nodo] = precioMinimo;
    });

    // 2. Analizar todas las combinaciones de paquetes y precios individuales
    ofertas.forEach((oferta, oferenteIndex) => {
      // Añadir ofertas individuales como combinaciones
      Object.entries(oferta.ofertas_individuales).forEach(([nodo, precio]) => {
        combinaciones.push({
          nodos: [nodo],
          precio,
          oferente: `Oferente${oferenteIndex + 1}`,
          tipo: 'individual'
        });
      });

      // Añadir ofertas en paquete como combinaciones, si cumplen con la condición de precios mínimos
      oferta.ofertas_paquete.forEach(paquete => {
        const esPaqueteValido = paquete.nodos.every(nodo => {
          return paquete.precio_total / paquete.nodos.length <= precioMinimoPorNodo[nodo];
        });

        if (esPaqueteValido) {
          combinaciones.push({
            nodos: paquete.nodos,
            precio: paquete.precio_total,
            oferente: `Oferente${oferenteIndex + 1}`,
            tipo: 'paquete'
          });
        }
      });
    });

    // 3. Buscar la combinación óptima que cubra todos los nodos con el menor precio total
    let mejorPrecioTotal = Infinity;
    let mejorCombinacion = [];

    const buscarCombinacionOptima = (nodosRestantes, combinacionActual, precioAcumulado) => {
      if (nodosRestantes.length === 0) {
        if (precioAcumulado < mejorPrecioTotal) {
          mejorPrecioTotal = precioAcumulado;
          mejorCombinacion = combinacionActual;
        }
        return;
      }

      combinaciones.forEach(combinacion => {
        const nodosCubiertos = combinacion.nodos;
        const nodosCubiertosFaltantes = nodosCubiertos.filter(nodo => nodosRestantes.includes(nodo));

        if (nodosCubiertosFaltantes.length === nodosCubiertos.length) {
          buscarCombinacionOptima(
            nodosRestantes.filter(nodo => !nodosCubiertos.includes(nodo)),
            [...combinacionActual, combinacion],
            precioAcumulado + combinacion.precio
          );
        }
      });
    };

    buscarCombinacionOptima(nodos, [], 0);

    // 4. Guardar el resultado óptimo en el estado
    setResultado({ mejorPrecioTotal, mejorCombinacion });
  };

  return (
    <Box mt={4}>
      <Button variant="contained" color="primary" onClick={calcularMejorCombinacion}>
        Calcular Mejor Combinación
      </Button>
      
      {resultado && (
        <Box mt={2}>
          <Typography variant="h6">Mejor Precio Total: ${resultado.mejorPrecioTotal}</Typography>
          <Typography variant="subtitle1">Detalles de la Combinación Óptima:</Typography>
          <List>
            {resultado.mejorCombinacion.map((combo, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    combo.tipo === 'paquete'
                      ? `Paquete (${combo.nodos.join(', ')})`
                      : `Nodo Individual (${combo.nodos[0]})`
                  }
                  secondary={`Oferente: ${combo.oferente} - Precio: $${combo.precio}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default ResultadoOptimo;
