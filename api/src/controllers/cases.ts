import CTX from '../interfaces/ctx.interface'
import ApplicationError from '../helpers/application-error'
import NewCase from '../interfaces/newcase.interface'
import CaseAssign from '../helpers/case-assign'
// import CaseAssign from "../helpers/case-assign";

// import Context from "koa-router"
const cases = {
  getList: async (ctx: CTX): Promise<void> => {
    const CaseModel = ctx.db.models.Case
    const cases = await CaseModel.findAll()
    ctx.status = 200
    ctx.body = { success: true, cases }
  },
  getById: async (ctx: CTX): Promise<void> => {
    const data = <{ id: number }>ctx.params
    const case_id = data.id
    const CaseModel = ctx.db.models.Case
    const thecase = await CaseModel.findOne({ where: { id: case_id } })
    ctx.status = 200
    ctx.body = { success: true, case: thecase }
  },
  createCase: async (ctx: CTX): Promise<void> => {
    const data = ctx.request.body as NewCase

    const email = data.email
    if (!email) throw new ApplicationError('email is missed', 200)

    const phone = data.email
    if (!phone) throw new ApplicationError('phone is missed', 200)

    const first_name = data.first_name
    if (!first_name) throw new ApplicationError('first_name is missed', 200)

    const last_name = data.last_name
    if (!last_name) throw new ApplicationError('last_name is missed', 200)

    const description = data.description
    if (!description) throw new ApplicationError('description is missed', 200)

    const created = new Date()

    const CaseModel = ctx.db.models.Case
    const newcase = CaseModel.build({
      email,
      phone,
      first_name,
      last_name,
      description,
      created,
    })
    await newcase.save()

    await CaseAssign.assignCase(<number>newcase.get('id'), ctx.db)

    ctx.status = 201
    ctx.body = { success: true, case: newcase }
  },
  updateStatus: async (ctx: CTX): Promise<void> => {
    const payload = <{ status: string }>ctx.request.body
    const status = payload.status
    if (!status) throw new ApplicationError('status is missed', 200)
    if (status != 'succeeded' && status != 'failed')
      throw new ApplicationError(
        "'status' be changed to 'succeeded' or 'failed'",
        200
      )
    const params = <{ id: number }>ctx.params
    const case_id = params.id
    const CaseModel = ctx.db.models.Case
    const thecase = await CaseModel.findOne({ where: { id: case_id } })
    if (!thecase) throw new ApplicationError('case is not found', 200)
    if (thecase.get('status') != 'in progress')
      throw new ApplicationError("Only 'in-progress' case can be reolved", 200)
    const officer_id = <number>thecase.get('police_officer_id')
    await CaseAssign.resolveCase(case_id, officer_id, status, ctx.db)
    await CaseAssign.assignOfficer(officer_id, ctx.db)
    await thecase.reload()
    ctx.status = 200
    ctx.body = { success: true, case: thecase }
  },
}
export default cases
