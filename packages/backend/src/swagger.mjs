import chalk from 'chalk'
import open from 'open'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vacations API',
      description: "API endpoints for vacation services",
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server"
      }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./src/*.mjs'],
})

export const swaggerDocs = (app, host, port) => {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log(chalk.blue.bold(
    `API documentation ` +
    chalk.white.underline(`http://${host}:${port}/docs`) +
    ` 📖 `
  ))
  open(`http://${host}:${port}/docs`)

  // Documentation in JSON format
  app.get('/docs.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
