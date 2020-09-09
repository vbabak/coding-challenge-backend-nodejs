import CTX from '../interfaces/ctx.interface'
import ApplicationError from '../helpers/application-error'
import NewOfficer from '../interfaces/newofficer.interface'
import CaseAssign from '../helpers/case-assign'

const cases = {
  createOfficer: async (ctx: CTX): Promise<void> => {
    const OfficerModel = ctx.db.models.PoliceOfficer
    const data = ctx.request.body as NewOfficer

    const email = data.email
    if (!email) throw new ApplicationError('email is missed', 200)

    const first_name = data.first_name
    if (!first_name) throw new ApplicationError('first_name is missed', 200)

    const last_name = data.last_name
    if (!last_name) throw new ApplicationError('last_name is missed', 200)

    const created = new Date()

    const exists = await OfficerModel.findOne({ where: { email } })
    if (exists) throw new ApplicationError('email already exists', 200)

    const newofficer = OfficerModel.build({
      email,
      first_name,
      last_name,
      created,
    })
    await newofficer.save()

    await CaseAssign.assignOfficer(<number>newofficer.get('id'), ctx.db)

    ctx.status = 201
    ctx.body = { success: true, officer: newofficer }
  },
}
export default cases
