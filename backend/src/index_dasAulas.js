const express = require('express');
const { uuid, isUuid } = require('uuidv4') // função para criação de um Id unico e universal

const app = express();

app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log('1');
  console.time(logLabel);
  
  next();
  console.log('2');
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId) // Outra forma de aplicar middleware especificando o tipo de rota

app.get('/projects', (request, response) => {
  console.log('3');
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects; // Filtrar pelo titulo se ele for enviado

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project); //Jogar o projeto no final do Array
  
  return response.json(project);
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id) // Função find para achar o projeto por ID

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' }) //Retorna um erro 400(Erro generico) 
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id) // Função find para achar o projeto por ID

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' }) //Retorna um erro 400(Erro generico) 
  }

  projects.splice(projectIndex, 1); //Metodo para remover que passa o indice e a quantidade a remover do array

  return response.status(204).send(); // Metodo que envia uma resposta vazia
})

app.listen(3333, () => {
  console.log('🚀 Back-end started on port 3333!')
});