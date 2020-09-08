import request from 'supertest'
import app from '../src/app'
import DB from '../src/interfaces/db.interface'

const db = <DB>app.context.db
afterAll(async (done) => {
  // for proper close db handlers
  await db.instance.authenticate()
  await db.instance.close()
  done()
})

describe('cases', () => {
  it('GET /cases successful', async () => {
    const response = await request(app.callback()).get('/cases').send()
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
  })
})
