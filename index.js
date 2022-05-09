import weather from './routes/weather.js'
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.register(weather)

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})