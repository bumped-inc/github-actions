"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const core = __importStar(require("@actions/core"));
function exec(command, args, options = {}) {
    const name = [command, ...args].join(' ');
    return core.group(name, () => new Promise((resolve, reject) => {
        const child = child_process_1.spawn(command, args, {
            stdio: 'inherit',
            env: {
                ...process.env,
                ...options.env,
            },
        });
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(`${name} exited with code ${code}`));
            }
        });
    }));
}
exports.exec = exec;
