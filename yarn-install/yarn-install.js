"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("../shared/exec");
async function run() {
    const npmToken = core.getInput('npm-token');
    await exec_1.exec('yarn', ['--non-interactive', 'install'], {
        env: {
            NODE_AUTH_TOKEN: npmToken,
        },
    });
    await exec_1.exec('git', ['diff', '--exit-code', 'yarn.lock']);
}
run().catch((error) => {
    core.setFailed(error.message);
});
