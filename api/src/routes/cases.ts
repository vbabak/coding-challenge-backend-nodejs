import Router from 'koa-router'
import cases from '../controllers/cases'
import CTX from '../interfaces/ctx.interface'
import { Context } from 'koa'

export default (router: Router): void => {
  router.get('/cases', async (ctx: Context) => {
    await cases.getList(<CTX>ctx)
  })
  router.get('/cases/:id', async (ctx: Context) => {
    await cases.getById(<CTX>ctx)
  })
  router.post('/cases', async (ctx: Context) => {
    await cases.createCase(<CTX>ctx)
  })
  router.patch('/cases/:id', async (ctx: Context) => {
    await cases.updateStatus(<CTX>ctx)
  })
}
