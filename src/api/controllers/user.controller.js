 
const signUp = (req, res) => {
  const { body } = req
  console.log('body', body)

  res.send('SIGN UP')
}

const signIn = (req, res) => {
  const { body } = req
  console.log('body', body)
  
  res.send('SIGN IN')
}

export default { signUp, signIn }