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

afterEach(async () => {
  await db.instance.query('ROLLBACK')
})

beforeEach(async () => {
  await db.instance.query('START TRANSACTION')
})

const payload = {
  email: 'test@email.com',
  first_name: 'John',
  last_name: 'Doe',
}

describe('cases', () => {
  it('POST /officers successful', async () => {
    const response = await request(app.callback())
      .post('/officers')
      .send(payload)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('officer')
  })

  it('POST /officers unique emails only', async () => {
    const OfficerModel = db.models.PoliceOfficer
    const created = new Date()
    const newofficer = OfficerModel.build(Object.assign({ created }, payload))
    await newofficer.save()
    const response = await request(app.callback())
      .post('/officers')
      .send(payload)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('error')
  })
})
