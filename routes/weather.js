import  Got  from 'got'
const apiKey = '6caafe474bb8d2535f39786ffbbd975b'

export default async function routes (fastify, options) {
    fastify.get('/getWeather/:city', async (request, reply) => {
        const urlcity = `http://api.openweathermap.org/geo/1.0/direct?q=${request.params.city}&limit=1&appid=${apiKey}`
        const city = await Got(urlcity)
        if(city.body.length === 0){
            reply.code(404).send({ msg: "We couldn't find the city you entered" })
            return
        }
        const parsed_city = JSON.parse(city.body)
        const lat = parsed_city[0].lat  
        const long = parsed_city[0].lon

        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily,minutely,alerts&appid=${apiKey}`
        const weather = await Got(url)
        const parsed_body = JSON.parse(weather.body)
        const city_weather = parsed_body.current.temp

        reply.code(200).send({ isHigherThan15: city_weather > 15 })
    })
  }
