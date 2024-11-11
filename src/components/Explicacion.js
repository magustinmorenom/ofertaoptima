import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Explicacion = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Metodología de Comparación y Selección de Ofertas
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Objetivo del Algoritmo
      </Typography>
      <Typography paragraph>
        El objetivo del algoritmo es encontrar la combinación de ofertas (individuales y en paquetes) que tenga el menor costo total para los nodos requeridos, de acuerdo a las condiciones establecidas.
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Pasos del Algoritmo
      </Typography>
      
      <List>
        <ListItem>
          <ListItemText primary="1. Identificar los Nodos Requeridos" secondary="El algoritmo toma en cuenta todos los nodos que se deben adjudicar." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="2. Revisar las Ofertas Individuales y Paquetes" secondary="Se recopilan los precios individuales y los precios de paquetes ofrecidos por cada oferente." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="3. Calcular el Precio Mínimo de Referencia para Cada Nodo" secondary="Para cada nodo, se calcula el precio mínimo que aparece en las ofertas individuales de todos los oferentes, lo cual actúa como referencia." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="4. Evaluar y Clasificar las Ofertas" secondary="El algoritmo revisa cada paquete y oferta individual para verificar si cumple con la condición de precio competitivo." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="5. Generar Combinaciones Posibles" secondary="Se generan todas las combinaciones posibles de ofertas que cubren todos los nodos requeridos." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="6. Calcular el Costo Total de Cada Combinación" secondary="Para cada combinación válida, se calcula el costo total sumando los precios de todas las ofertas incluidas." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="7. Comparar Costos Totales y Seleccionar la Combinación Óptima" secondary="El algoritmo selecciona la combinación con el costo total más bajo entre todas las combinaciones válidas." />
        </ListItem>
        
        <ListItem>
          <ListItemText primary="8. Resultado Final" secondary="El algoritmo presenta la combinación óptima y el costo total asociado, con detalles de cada nodo adjudicado." />
        </ListItem>
      </List>
      
      <Typography variant="h6" gutterBottom>
        Ejemplo de Funcionamiento
      </Typography>
      <Typography paragraph>
        Supongamos que los nodos `A`, `B`, `C`, `D` y `E` deben ser adjudicados. El algoritmo calcula precios mínimos de referencia, evalúa ofertas, genera combinaciones y selecciona la que minimiza el costo total.
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Conclusión
      </Typography>
      <Typography paragraph>
        Este algoritmo garantiza una adjudicación basada en el costo total más bajo posible, respetando los precios de referencia y seleccionando las ofertas más convenientes.
      </Typography>
    </Box>
  );
};

export default Explicacion;
