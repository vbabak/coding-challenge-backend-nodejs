import DB from '../interfaces/db.interface'
const NODE_ENV = process.env.NODE_ENV || 'production'
const transactions = {
  start: async (db: DB): Promise<void> => {
    if (NODE_ENV != 'test') {
      await db.instance.query('START TRANSACTION')
    }
  },
  commit: async (db: DB): Promise<void> => {
    if (NODE_ENV != 'test') {
      await db.instance.query('COMMIT')
    }
  },
  rollback: async (db: DB): Promise<void> => {
    if (NODE_ENV != 'test') {
      await db.instance.query('ROLLBACK')
    }
  },
}
export default transactions
