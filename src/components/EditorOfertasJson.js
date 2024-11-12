import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const EditorOfertasJson = ({ onSave }) => {
  const [jsonContent, setJsonContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await fetch('/data/ofertas.json');
        if (!response.ok) {
          throw new Error('Error loading the JSON file');
        }
        const data = await response.json();
        setJsonContent(JSON.stringify(data, null, 2));
      } catch (e) {
        setError('Error loading the JSON file');
      }
    };

    loadOffers();
  }, []);

  const handleSave = async () => {
    try {
      const updatedOffers = JSON.parse(jsonContent);
      const response = await fetch('/data/ofertas.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ofertas: updatedOffers }),
      });
      if (!response.ok) {
        throw new Error('Error saving the JSON file');
      }
      onSave(updatedOffers);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <Box>
      <CodeMirror
        value={jsonContent}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setJsonContent(value);
        }}
      />
      {error && <Box color="error.main">{error}</Box>}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditorOfertasJson;