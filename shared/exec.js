"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
const core = __importStar(require("@actions/core"));
function exec(command, args, options = {}) {
    const name = [command, ...args].join(" ");
    return core.group(name, () => new Promise((resolve, reject) => {
        const child = child_process_1.spawn(command, args, {
            stdio: "inherit",
            env: {
                ...process.env,
                ...options.env,
            },
        });
        child.on("close", (code) => {
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
