import Got from 'got'
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

const apiKey = '6caafe474bb8d2535f39786ffbbd975b'

fastify.get('/getWeather/:city', async (request, reply) => {
    const urlcity = `http://api.openweathermap.org/geo/1.0/direct?q=${request.params.city}&limit=1&appid=${apiKey}`
    const city = await Got(urlcity)
    const parsed_city = JSON.parse(city.body)
    const lat = parsed_city[0].lat
    const long = parsed_city[0].lon

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily,minutely,alerts&appid=${apiKey}`
    const weather = await Got(url)
    const parsed_body = JSON.parse(weather.body)
    const city_weather = parsed_body.current.temp
    //const texto = 'La temperatura en Rio Cuarto es ' + (city_weather > 15 ? 'MAYOR ' : 'MENOR ') + 'A 15 GRADOS CELCIUS'

    reply.send({ isHigherThan15: city_weather > 15 })
})

//fastify.register(weather)

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})