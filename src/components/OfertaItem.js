import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Stack, Card } from '@mui/material';

const OfertaItem = ({ oferta, resultadoOptimo }) => {
  // Función para verificar si una oferta individual está en el resultado óptimo
  const isIndividualSelected = (nodo) => {
    return resultadoOptimo?.some(item => item.tipo === 'individual' && item.oferente === oferta.oferente && item.nodos[0] === nodo);
  };

  // Función para verificar si un paquete está en el resultado óptimo
  const isPackageSelected = (paquete) => {
    return resultadoOptimo?.some(item => item.tipo === 'paquete' && item.oferente === oferta.oferente && item.nodos.join(',') === paquete.nodos.join(','));
  };

  return (
    <Box mb={2}>
      <Typography variant="h6">{oferta.oferente}</Typography>
      <Typography variant="subtitle1">Ofertas Individuales:</Typography>
      <List>
        {Object.entries(oferta.ofertas_individuales).map(([nodo, precio], index) => (
          <ListItem key={index}>
            <Card sx={{ backgroundColor: isIndividualSelected(nodo) ? 'green' : 'lightblue', color: isIndividualSelected(nodo) ? 'white' : 'inherit', padding: 1, width: '100%' }}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2">{nodo}:</Typography>
                <Typography variant="body2">${precio}</Typography>
                {oferta.descuento && <Typography variant="body2"> (Descuento: {oferta.descuento})</Typography>}
              </Stack>
            </Card>
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1">Ofertas por Paquete:</Typography>
      <List>
        {oferta.ofertas_paquete.map((paquete, index) => {
          const avgPricePerNode = (paquete.precio_total / paquete.nodos.length).toFixed(2);
          return (
            <ListItem key={index}>
              <Card sx={{ backgroundColor: isPackageSelected(paquete) ? 'green' : 'lightblue', color: isPackageSelected(paquete) ? 'white' : 'inherit', padding: 1, width: '100%' }}>
                <ListItemText
                  primary={<Typography variant="body2">Nodos: {paquete.nodos.join(', ')}</Typography>}
                  secondary={
                    <Typography variant="body2">
                      Precio Total: ${paquete.precio_total} (Descuento: {paquete.descuento})<br />
                      Promedio por Nodo: ${avgPricePerNode}
                    </Typography>
                  }
                />
              </Card>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default OfertaItem;
