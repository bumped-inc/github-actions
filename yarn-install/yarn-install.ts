import * as core from "@actions/core";
import { exec } from "../shared/exec";

async function run(): Promise<void> {
  const npmToken = core.getInput("npm-token");
  await exec("yarn", ["--non-interactive", "install"], {
    env: {
      NODE_AUTH_TOKEN: npmToken,
    },
  });
  await exec("git", ["diff", "--exit-code", "yarn.lock"]);
}

run().catch((error) => {
  core.setFailed(error.message);
});
