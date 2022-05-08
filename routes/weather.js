import Got from 'got'
const apiKey = '6caafe474bb8d2535f39786ffbbd975b'
const lat=-33.13067
const long=-64.34992
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&long=${long}&units=metric&appid=${apiKey}`

async function routes (fastify, options) {
    fastify.get('/getWeather', async (request, reply) => {
        const response = await Got(url)
        const parsed_body = JSON.parse(response.body)
        const city_weather = parsed_body.current.temp
    
       /* if( city_weather > 15){
    
        }*/
        reply.send({ response: response })
    })
  }
  
  module.exports = routes