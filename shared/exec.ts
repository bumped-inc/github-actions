import * as core from "@actions/core";
import { spawn } from "child_process";

export interface ExecOptions {
  env?: NodeJS.ProcessEnv;
}
export function exec(
  command: string,
  args: readonly string[],
  options: ExecOptions = {}
): Promise<void> {
  const name = [command, ...args].join(' ');
  return core.group(name, () => new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: {
        ...process.env,
        ...options.env
      }
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${name} exited with code ${code}`));
      }
    });
  }));
}
