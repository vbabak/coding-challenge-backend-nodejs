import DB from './db.interface'
import { Context } from 'koa'

export default interface CTX extends Context {
  db: DB
}
