import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import ApplicationError from './helpers/application-error'
import dbmodels from './models/index'
import casesroute from './routes/cases'
import officersroute from './routes/officers'

const app = new Koa()
app.use(cors())
app.use(bodyParser())

const router = new Router()

app.on('error', (err) => {
  console.error(err)
})

app.use(async (ctx, next) => {
  const handler = (err: Error | ApplicationError) => {
    ctx.status = err instanceof ApplicationError ? err.status : 500
    ctx.body = {
      success: false,
      error: err.name,
      error_message: err.message,
    }
    ctx.app.emit('error', err, ctx)
  }
  try {
    await next().catch(handler)
  } catch (err) {
    handler(err)
  }
})

app.context.db = dbmodels

casesroute(router)
officersroute(router)
app.use(router.routes())
app.use(router.allowedMethods())

export default app
