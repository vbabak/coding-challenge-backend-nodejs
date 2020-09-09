import Router from 'koa-router'

export default (router: Router): void => {
  router.get('/cases', (ctx): void => {
    ctx.status = 200
    ctx.body = { success: true }
  })
  router.post('/cases', (ctx): void => {
    ctx.status = 201
    ctx.body = { success: true }
  })
}
