import React, { useMemo } from 'react';
import ReactFlow, { Controls, Background } from 'react-flow-renderer';

const GrafoCombinaciones = ({ combinaciones = [], resultadoOptimo = [] }) => {
  // Función para verificar si una combinación está en el resultado óptimo
  const isComboInResultadoOptimo = (combo) => {
    return resultadoOptimo.some(optCombo => {
      return (
        optCombo.oferente === combo.oferente &&
        optCombo.tipo === combo.tipo &&
        optCombo.precio === combo.precio &&
        JSON.stringify(optCombo.nodos) === JSON.stringify(combo.nodos)
      );
    });
  };

  const nodes = useMemo(() => {
    return (combinaciones || []).map((combo, index) => {
      const label = combo.tipo === 'paquete'
        ? `Paquete (${combo.nodos.join(', ')})\nOferente: ${combo.oferente}\nPrecio Total: $${combo.precio}\nPromedio por Nodo: $${combo.precioPromedioPorNodo}`
        : `Nodo (${combo.nodos[0]})\nOferente: ${combo.oferente}\nPrecio: $${combo.precio}`;

      return {
        id: `combo-${index}`,
        type: 'default',
        data: { label },
        position: { x: 200 * (index % 5), y: 150 * Math.floor(index / 5) },
        style: {
          background: isComboInResultadoOptimo(combo) ? 'green' : 'lightblue',
          color: isComboInResultadoOptimo(combo) ? 'white' : 'black',
          padding: 10,
          borderRadius: 5,
          border: '1px solid black',
          width: 180,
          textAlign: 'center',
          whiteSpace: 'pre-line', // Permitir saltos de línea en el label
        },
      };
    });
  }, [combinaciones, resultadoOptimo, isComboInResultadoOptimo]);

  const edges = useMemo(() => {
    return (combinaciones || []).slice(1).map((_, index) => ({
      id: `edge-${index}`,
      source: `combo-${index}`,
      target: `combo-${index + 1}`,
      animated: isComboInResultadoOptimo(combinaciones[index + 1]),
      style: {
        stroke: isComboInResultadoOptimo(combinaciones[index + 1]) ? 'green' : 'black',
      },
    }));
  }, [combinaciones, resultadoOptimo, isComboInResultadoOptimo]);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default GrafoCombinaciones;
