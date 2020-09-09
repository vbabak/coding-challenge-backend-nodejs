import request from 'supertest'
import app from '../src/app'
import DB from '../src/interfaces/db.interface'

const db = <DB>app.context.db
// transaction(options ?: TransactionOptions): Promise<Transaction>;
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
  phone: '123',
  first_name: 'John',
  last_name: 'Doe',
  description: 'nice green bike',
}

describe('cases', () => {
  it('GET /cases successful', async () => {
    const response = await request(app.callback()).get('/cases').send()
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('cases')
  })

  it('POST /cases successful', async () => {
    const response = await request(app.callback()).post('/cases').send(payload)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('case')
  })

  it('GET /cases/:id successful', async () => {
    const CaseModel = db.models.Case
    const created = new Date()
    const newentry = CaseModel.build(Object.assign({ created }, payload))
    await newentry.save()
    const new_id = <number>newentry.get('id')
    const response = await request(app.callback())
      .get(`/cases/${new_id}`)
      .send()
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('case')
    const response_case = <{ case: { id: number } }>response.body
    expect(response_case.case.id).toBe(new_id)
  })

  it('PATCH /cases/:id resolve status', async () => {
    const officer_payload = {
      email: 'test@email.com',
      first_name: 'John',
      last_name: 'Doe',
    }
    const OfficerModel = db.models.PoliceOfficer
    const created = new Date()
    const newofficer = OfficerModel.build(
      Object.assign({ created }, officer_payload)
    )
    await newofficer.save()
    const CaseModel = db.models.Case

    const status_prev = 'in progress'
    const status_next = 'succeeded'
    const newentry = CaseModel.build(
      Object.assign(
        {
          created,
          status: status_prev,
          police_officer_id: <number>newofficer.get('id'),
        },
        payload
      )
    )
    await newentry.save()
    const new_id = <number>newentry.get('id')
    const response = await request(app.callback())
      .patch(`/cases/${new_id}`)
      .send({ status: status_next })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('case')
    const response_case = <{ case: { status: string } }>response.body
    expect(response_case.case.status).toBe(status_next)
  })
})
