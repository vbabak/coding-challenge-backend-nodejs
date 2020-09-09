import Router from 'koa-router'
import officers from '../controllers/officers'
import CTX from '../interfaces/ctx.interface'
import { Context } from 'koa'

export default (router: Router): void => {
  router.post('/officers', async (ctx: Context) => {
    await officers.createOfficer(<CTX>ctx)
  })
}
