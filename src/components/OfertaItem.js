import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const OfertaItem = ({ oferta }) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">{oferta.oferente}</Typography>
      <Typography variant="subtitle1">Ofertas Individuales:</Typography>
      <List>
        {Object.entries(oferta.ofertas_individuales).map(([nodo, precio], index) => (
          <ListItem key={index}>
            <ListItemText primary={`${nodo}: $${precio}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1">Ofertas por Paquete:</Typography>
      <List>
        {oferta.ofertas_paquete.map((paquete, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Nodos: ${paquete.nodos.join(', ')}`}
              secondary={`Precio Total: $${paquete.precio_total} (Descuento: ${paquete.descuento})`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OfertaItem;
