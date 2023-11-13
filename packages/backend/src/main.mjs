import chalk from 'chalk'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import process from 'process'
import {
  createEmployee,
  createVacation,
  deleteEmployee,
  getEmployee,
  getEmployees,
} from './queries.mjs'
import { swaggerDocs } from './swagger.mjs'

const host = 'localhost'
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.disable('x-powered-by')

/**
    * @openapi
    * '/':
    *  get:
    *     summary: Health check
    *     tags:
    *       - Root
    *     responses:
    *      200:
    *        description: Fetched Successfully
    *      400:
    *        description: Bad Request
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
app.get('/', (_, res) => res.send('Systems online'))

/**
    * @openapi
    * '/employee':
    *  post:
    *     summary: Create an employee
    *     tags:
    *       - Employee
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - firstName
    *              - lastName
    *            properties:
    *              firstName:
    *                type: string
    *                default: Albert 
    *              lastName:
    *                type: string
    *                default: Einstein
    *     responses:
    *      201:
    *        description: Created
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
app.post('/employee', createEmployee)

/**
 * @openapi
 * '/employee/{id}':
 *  get:
 *     summary: Get an employee by id
 *     tags:
 *       - Employee
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id of the employee
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.get('/employee/:id', getEmployee)

/**
     * @openapi
     * '/employee/{id}':
     *  delete:
     *     summary: Delete employee by Id
     *     tags:
     *       - Employee
     *     parameters:
     *      - name: id
     *        in: path
     *        description: Unique Id of the employee
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
app.delete('/employee/:id', deleteEmployee)

/**
    * @openapi
    * '/employees':
    *  get:
    *     summary: Get list of all employees
    *     tags:
    *       - Employee
    *     responses:
    *      200:
    *        description: Fetched Successfully
    *      400:
    *        description: Bad Request
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
app.get('/employees', getEmployees)

/**
    * @openapi
    * '/vacation/{employeeId}':
    *  post:
    *     summary: Create a vacation for an employee
    *     tags:
    *       - Vacation
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - startDate
    *              - endDate
    *            properties:
    *              startDate:
    *                type: string
    *              endDate:
    *                type: string
    *     responses:
    *      201:
    *        description: Created
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
app.post('/vacation/:employeeId', createVacation)

app.listen(port, () => {
  console.log(chalk.blue.bold(
    `Server is runnning ` +
    chalk.white.underline(`http://${host}:${port}`) +
    ' 🖥️'
  ))
  swaggerDocs(app, host, port)
})
