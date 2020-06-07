const express = require('express');

const app = express();

app.get('/projetcs', (request, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
    'Projeto 4',
  ]);
});

app.post('/projects', (resquest, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
    'Projeto 4',
  ]);
})

app.put('/projects/:id', (resquest, response) => {
  return response.json([
    'Projeto 5',
    'Projeto 6',
    'Projeto 3',
    'Projeto 4',
  ]);
})

app.put('/projects/:id', (resquest, response) => {
  return response.json([
    'Projeto 3',
    'Projeto 4',
  ]);
})

app.listen(3333, () => {
  console.log('🚀 Back-end started on port 3333!')
});