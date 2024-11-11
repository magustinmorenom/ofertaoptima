import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const EmpateCheck = ({ resultadoOptimo, todasLasOfertas }) => {
  const [empates, setEmpates] = useState([]);

  useEffect(() => {
    const empatesEncontrados = [];

    resultadoOptimo.forEach((optima) => {
      const { oferente: oferenteOptimo, nodos, tipo, precio, precioPromedioPorNodo } = optima;

      // Empate en Ofertas Individuales
      if (tipo === 'individual') {
        todasLasOfertas.forEach((oferta) => {
          if (
            oferta.oferente !== oferenteOptimo &&
            oferta.ofertas_individuales[nodos[0]] === precio
          ) {
            empatesEncontrados.push({
              tipo: 'individual',
              nodo: nodos[0],
              oferente: oferta.oferente,
              mensaje: `Empate en el nodo ${nodos[0]} con el oferente ${oferta.oferente} al mismo precio de $${precio}.`,
            });
          }
        });
      }

      // Empate en Paquetes
      if (tipo === 'paquete') {
        todasLasOfertas.forEach((oferta) => {
          oferta.ofertas_paquete.forEach((paquete) => {
            const mismosNodos = JSON.stringify(paquete.nodos.sort()) === JSON.stringify(nodos.sort());
            const mismoPrecio = paquete.precio_total === precio;

            if (oferta.oferente !== oferenteOptimo && mismosNodos && mismoPrecio) {
              empatesEncontrados.push({
                tipo: 'paquete',
                nodos: paquete.nodos,
                oferente: oferta.oferente,
                mensaje: `Empate en paquete de nodos (${paquete.nodos.join(', ')}) con el oferente ${oferta.oferente} al mismo precio de $${precio}.`,
              });
            }
          });
        });
      }

      // Empate en Paquetes Parcialmente Coincidentes
      if (tipo === 'paquete') {
        todasLasOfertas.forEach((oferta) => {
          oferta.ofertas_paquete.forEach((paquete) => {
            const nodosCoincidentes = paquete.nodos.filter(nodo => nodos.includes(nodo));
            const mismoPrecioPromedio = (paquete.precio_total / paquete.nodos.length).toFixed(2) === precioPromedioPorNodo;

            if (
              oferta.oferente !== oferenteOptimo &&
              nodosCoincidentes.length > 0 &&
              nodosCoincidentes.length < nodos.length &&
              mismoPrecioPromedio
            ) {
              empatesEncontrados.push({
                tipo: 'parcial',
                nodos: nodosCoincidentes,
                oferente: oferta.oferente,
                mensaje: `Paquete parcial con nodos (${nodosCoincidentes.join(', ')}) del oferente ${oferta.oferente} con el mismo precio promedio por nodo de $${precioPromedioPorNodo}.`,
              });
            }
          });
        });
      }
    });

    setEmpates(empatesEncontrados);
  }, [resultadoOptimo, todasLasOfertas]);

  return (
    <Box mt={4}>
      <Typography variant="h6">Resultado de Empates</Typography>
      {empates.length > 0 ? (
        <List>
          {empates.map((empate, index) => (
            <ListItem key={index}>
              <ListItemText primary={empate.mensaje} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No se encontraron empates.</Typography>
      )}
    </Box>
  );
};

export default EmpateCheck;
