
const create = (req, res) => {
  const { body } = req
  console.log('body', body)

  res.send('CREATE TOURNAMENT')
}

const getAll = (req, res) => {
  const { body } = req
  console.log('body', body)
  
  res.send('GET All TOURNAMENT')

}

export { create, getAll }