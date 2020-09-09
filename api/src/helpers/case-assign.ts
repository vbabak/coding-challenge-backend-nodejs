import DB from '../interfaces/db.interface'
import { QueryTypes } from 'sequelize'
import transactions from './transactions'

const assignCase = async (
  case_id: number,
  officer_id: number,
  db: DB
): Promise<void> => {
  await db.instance.query(
    'UPDATE `police_officer` SET is_available = :is_available WHERE id = :officer_id LIMIT 1',
    {
      type: QueryTypes.UPDATE,
      replacements: { is_available: 0, officer_id },
    }
  )
  await db.instance.query(
    'UPDATE `case` SET police_officer_id = :officer_id, `status` = :status WHERE id = :case_id LIMIT 1',
    {
      type: QueryTypes.UPDATE,
      replacements: { officer_id, case_id, status: 'in progress' },
    }
  )
}

const CaseAssign = {
  assignCase: async (case_id: number, db: DB): Promise<void> => {
    await transactions.start(db)
    const available_bikes = await db.instance.query(
      'SELECT id FROM `case` WHERE id = :case_id AND `status` = :status  AND police_officer_id IS NULL LIMIT 1 FOR UPDATE',
      {
        type: QueryTypes.SELECT,
        mapToModel: false,
        replacements: { case_id, status: 'new' },
      }
    )
    const available_officers = await db.instance.query(
      'SELECT id FROM `police_officer` WHERE is_available = :is_available LIMIT 1 FOR UPDATE',
      {
        type: QueryTypes.SELECT,
        mapToModel: false,
        replacements: { is_available: 1 },
      }
    )
    if (available_officers.length && available_bikes.length) {
      const entry = <{ id: number }>available_officers[0]
      const officer_id = entry.id
      await assignCase(case_id, officer_id, db)
    }
    await transactions.commit(db)
  },
  assignOfficer: async (officer_id: number, db: DB): Promise<void> => {
    await transactions.start(db)
    const available_cases = await db.instance.query(
      'SELECT id FROM `case` WHERE `status` = :status AND police_officer_id IS NULL LIMIT 1 FOR UPDATE',
      {
        type: QueryTypes.SELECT,
        mapToModel: false,
        replacements: { status: 'new' },
      }
    )
    const available_officers = await db.instance.query(
      'SELECT id FROM `police_officer` WHERE id = :officer_id AND is_available = :is_available LIMIT 1 FOR UPDATE',
      {
        type: QueryTypes.SELECT,
        mapToModel: false,
        replacements: { officer_id, is_available: 1 },
      }
    )
    if (available_cases.length && available_officers.length) {
      const entry = <{ id: number }>available_cases[0]
      const case_id = entry.id
      await assignCase(case_id, officer_id, db)
    }
    await transactions.commit(db)
  },
  resolveCase: async (
    case_id: number,
    officer_id: number,
    status: string,
    db: DB
  ): Promise<void> => {
    await transactions.start(db)
    const cases = await db.instance.query(
      'SELECT id FROM `case` WHERE `id` = :case_id LIMIT 1 FOR UPDATE',
      {
        type: QueryTypes.SELECT,
        mapToModel: false,
        replacements: { case_id },
      }
    )
    const officers = await db.instance.query(
      'SELECT id FROM `police_officer` WHERE id = :officer_id LIMIT 1 FOR UPDATE',
      {
        type: QueryTypes.SELECT,
        mapToModel: false,
        replacements: { officer_id },
      }
    )
    if (cases.length && officers.length) {
      await db.instance.query(
        'UPDATE `case` SET `status` = :status WHERE id = :case_id LIMIT 1',
        {
          type: QueryTypes.UPDATE,
          replacements: { case_id, status },
        }
      )
      await db.instance.query(
        'UPDATE `police_officer` SET `is_available` = :is_available WHERE id = :officer_id LIMIT 1',
        {
          type: QueryTypes.UPDATE,
          replacements: { officer_id, is_available: 1 },
        }
      )
    }
    await transactions.commit(db)
  },
}
export default CaseAssign
