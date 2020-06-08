// Index do desafio
const express = require('express');
const {uuid, isUuid} = require('uuidv4')

const app = express();
app.use(express.json())

const products = [ ];

app.get('/products', (request, response) => {
  const name = request.query

  // const results = name 
  //   ? products.filter(product => product.name.includes(name))
  //   : products

  return response.json(products)
})

app.post('/products', (request, response) => {
  const { name, price } = request.body;
  const product = { id: uuid(), name, price}
  
  products.push(product)
  return response.json(product)
})

app.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body

  const productIndex = products.findIndex(product => product.id === id)

  if (productIndex < 0) {
    return response.status(400).json({ error: "Product Id not found" })
  }

  const product = { id, name, price}

  products[productIndex] = product

  return response.json(product)
})

app.delete('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body

  const productIndexOf = products.findIndex(p => p.id === id)

  if(products < 0) {
    return response.status(400).json({ error: "Product Id not found" })
  }

  products.splice(productIndexOf, 1)

  return response.status(240).send()
})

app.listen(3333)