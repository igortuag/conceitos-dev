import React, { useState, useEffect } from 'react'
import Header from './components/Header'

import api from './services/api'
import './App.css'

export default props => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('products').then(response => {
      setProducts(response.data);
    })
  }, [])

  async function handleAddProduct() {

    const response = await api.post('products', {
      name: `Sansung Note 9V8 3`,
      price: `2500.99`
    });

    const product = response.data;
    setProducts([...products, product])
  }

  return (
    <>
      <Header title="Produtos" subTitle="Cadastro de Produtos" />
      <ul>
        {products.map(p =>
          <li>{p.name} - Preço R$ {p.price}</li>)
        }
      </ul>
      <div className="testButton">
        <button type="button" onClick={handleAddProduct}>Adicionar Produtos</button>
      </div>
    </>
  )
}