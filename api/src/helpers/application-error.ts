export default class ApplicationError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}
