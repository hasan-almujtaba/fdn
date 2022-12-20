import axios from 'axios'

const handler = async (req, res) => {
  const { data } = await axios.get(
    'https://lemon-pets-roll-103-165-155-71.loca.lt/products'
  )

  res.json({
    data,
  })
}

export default handler
