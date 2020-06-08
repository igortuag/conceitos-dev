import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  function handleAddProject() {
    setProjects([ ...projects, `Novo projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>{projects.map(p => <li key={p.id}>{p.title}</li>)}</ul>
      
      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App;