import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, Paper, Button } from '@mui/material';
import OfertaItem from './components/OfertaItem';
import ResultadoOptimo from './components/ResultadoOptimo';
import GrafoCombinaciones from './components/GrafoCombinaciones';
import EmpateCheck from './components/EmpateCheck';

const App = () => {
  const [ofertas, setOfertas] = useState([]);
  const [resultadoOptimo, setResultadoOptimo] = useState([]);
  const [combinacionesEvaluadas, setCombinacionesEvaluadas] = useState([]);
  const [totalCombinaciones, setTotalCombinaciones] = useState(0); // Estado para el total de combinaciones
  const [mostrarGrafo, setMostrarGrafo] = useState(false); // Estado para mostrar el grafo
  const [combinacionesEmpatadas, setCombinacionesEmpatadas] = useState([]); // Estado para las combinaciones empatadas
  const [mostrarEmpates, setMostrarEmpates] = useState(false); // Estado para mostrar empates

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

  // Función para manejar el resultado óptimo y las combinaciones evaluadas
  const handleResultadoOptimo = (resultado, combinaciones, total) => {
    setResultadoOptimo(resultado);
    setCombinacionesEvaluadas(combinaciones);
    setTotalCombinaciones(total); // Guardar el total de combinaciones
    setMostrarGrafo(false); // Reiniciar el estado de mostrar grafo
    setMostrarEmpates(false); // Reiniciar el estado de mostrar empates
  };

  // Función para manejar combinaciones empatadas desde EmpateCheck
  const handleEmpates = (empates) => {
    setCombinacionesEmpatadas(empates);
  };

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
                <OfertaItem
                  oferta={oferta}
                  resultadoOptimo={resultadoOptimo}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Divider sx={{ marginY: 4 }} />

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box flex="1" minWidth="300px" p={1}>
              <ResultadoOptimo
                ofertas={ofertas}
                onResultadoOptimo={handleResultadoOptimo}
              />
            </Box>
            <Box flex="1" minWidth="300px" p={1}>
              <EmpateCheck resultadoOptimo={resultadoOptimo} todasLasOfertas={ofertas} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ marginY: 4 }} />

      {/* Mostrar el total de combinaciones y preguntar si se quiere ver el grafo */}
      <Typography variant="h5" align="center" gutterBottom>
        Total de combinaciones evaluadas: {totalCombinaciones}
      </Typography>
      <Box textAlign="center" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setMostrarGrafo(true)}
          disabled={totalCombinaciones === 0}
        >
          Ver Grafo de Combinaciones Evaluadas
        </Button>
      </Box>

      {mostrarGrafo && (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Grafo de Combinaciones Evaluadas
          </Typography>
          <GrafoCombinaciones
            combinaciones={combinacionesEvaluadas}
            resultadoOptimo={resultadoOptimo}
          />
        </Paper>
      )}

    </Container>
  );
};

export default App;
