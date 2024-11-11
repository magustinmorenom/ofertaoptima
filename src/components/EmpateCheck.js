import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const EmpateCheck = ({ resultadoOptimo, todasLasOfertas }) => {
  const [empates, setEmpates] = useState([]);
  const [alternativasEmpatadas, setAlternativasEmpatadas] = useState([]);

  useEffect(() => {
    const empatesEncontrados = [];
    const nuevasAlternativas = [];

    resultadoOptimo.forEach((optima) => {
      const { oferente: oferenteOptimo, nodos, tipo, precio } = optima;

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

            // Generar una alternativa completa incluyendo esta oferta individual
            const alternativaCompleta = [
              ...resultadoOptimo.filter((item) => item.nodos[0] !== nodos[0]),
              { tipo: 'individual', nodo: nodos[0], oferente: oferta.oferente, precio },
            ];
            const totalAlternativa = alternativaCompleta.reduce((sum, item) => sum + item.precio, 0);

            nuevasAlternativas.push({
              alternativa: alternativaCompleta,
              total: totalAlternativa,
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

              // Generar una alternativa completa incluyendo este paquete
              const alternativaCompleta = [
                ...resultadoOptimo.filter((item) => JSON.stringify(item.nodos.sort()) !== JSON.stringify(nodos.sort())),
                { tipo: 'paquete', nodos: paquete.nodos, oferente: oferta.oferente, precio: paquete.precio_total },
              ];
              const totalAlternativa = alternativaCompleta.reduce((sum, item) => sum + item.precio, 0);

              nuevasAlternativas.push({
                alternativa: alternativaCompleta,
                total: totalAlternativa,
              });
            }
          });

          // Verificación de combinación de nodos individuales que igualen el paquete
          const nodosIndividuales = Object.entries(oferta.ofertas_individuales)
            .filter(([nodo]) => nodos.includes(nodo))
            .map(([nodo, precio]) => ({ nodo, precio }));

          const precioTotalIndividuales = nodosIndividuales.reduce((sum, item) => sum + item.precio, 0);

          if (
            oferta.oferente !== oferenteOptimo &&
            nodosIndividuales.length === nodos.length &&
            precioTotalIndividuales === precio
          ) {
            empatesEncontrados.push({
              tipo: 'paquete (combinación de individuales)',
              nodos: nodosIndividuales.map((item) => item.nodo),
              oferente: oferta.oferente,
              mensaje: `Empate en paquete de nodos (${nodosIndividuales.map((item) => item.nodo).join(', ')}) mediante ofertas individuales del oferente ${oferta.oferente} al mismo precio total de $${precio}.`,
            });

            // Generar una alternativa completa con los nodos individuales
            const alternativaCompleta = [
              ...resultadoOptimo.filter((item) => JSON.stringify(item.nodos.sort()) !== JSON.stringify(nodos.sort())),
              ...nodosIndividuales.map((item) => ({
                tipo: 'individual',
                nodo: item.nodo,
                oferente: oferta.oferente,
                precio: item.precio,
              })),
            ];
            const totalAlternativa = alternativaCompleta.reduce((sum, item) => sum + item.precio, 0);

            nuevasAlternativas.push({
              alternativa: alternativaCompleta,
              total: totalAlternativa,
            });
          }
        });
      }
    });

    setEmpates(empatesEncontrados);
    setAlternativasEmpatadas(nuevasAlternativas);
  }, [resultadoOptimo, todasLasOfertas]);

  return (
    <Box mt={4}>
      <Typography variant="h6">Resultado de Empates</Typography>
      {empates.length > 0 ? (
        <>
          <List>
            {empates.map((empate, index) => (
              <ListItem key={index}>
                <ListItemText primary={empate.mensaje} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" mt={4}>Alternativas de Combinaciones Empatadas</Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            {alternativasEmpatadas.map((alt, index) => (
              <Card key={index} variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h6">Alternativa {index + 1} - Total: ${alt.total}</Typography>
                  {alt.alternativa.map((item, itemIndex) => (
                    <Typography key={itemIndex} variant="body2">
                      {item.tipo === 'paquete'
                        ? `Paquete (${item.nodos.join(', ')}) - Oferente: ${item.oferente} - Precio: $${item.precio}`
                        : `Nodo Individual (${item.nodo}) - Oferente: ${item.oferente} - Precio: $${item.precio}`}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="body1">No se encontraron empates.</Typography>
      )}
    </Box>
  );
};

export default EmpateCheck;
