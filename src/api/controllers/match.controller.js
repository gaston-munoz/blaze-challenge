 
const create = (req, res) => {
  const { body } = req
  console.log('body', body)

  res.send('CREATE MATCH')
}

const getAll = (req, res) => {
  const { body } = req
  console.log('body', body)
  
  res.send('GET All MATCHES')
}

export { create, getAll }