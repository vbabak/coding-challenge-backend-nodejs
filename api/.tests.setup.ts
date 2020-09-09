import os from 'os'
import { exec, ExecException } from 'child_process'
const NODE_ENV = process.env.NODE_ENV
const env_str = os.type().toLowerCase().startsWith('windows')
  ? 'SET NODE_ENV=' + NODE_ENV + '&&'
  : 'NODE_ENV=' + NODE_ENV + ' '

function runCmd(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      null,
      (
        error: ExecException | null,
        stdout: string | Buffer,
        stderr: string | Buffer
      ): void => {
        if (error) {
          console.error(error)
          reject(stderr)
        }
        resolve(stdout)
      }
    )
  })
}

const setup = async () => {
  await runCmd(env_str + 'npx sequelize-cli db:migrate --env ' + NODE_ENV)
}

export default setup
