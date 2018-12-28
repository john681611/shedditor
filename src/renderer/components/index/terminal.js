import * as os from 'os';
import * as pty from 'node-pty-prebuilt';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
const _debounce = require('lodash.debounce');

Terminal.applyAddon(fit);

const term = new Terminal({
    fontFamily: 'Fira Code, Iosevka, monospace',
    fontSize: 12,
    experimentalCharAtlas: 'dynamic'
});

const terminalElem = document.getElementById('terminal');

term.open(terminalElem);
term.fit();

const ptyProc = pty.spawn(os.platform() === 'win32' ? 'powershell.exe' : process.env.SHELL || '/bin/bash', [], {
    cols: term.cols,
    rows: term.rows,
    cwd: process.env.HOME,
    env: process.env
});

const fitDebounced = _debounce(() => {
    term.fit();
}, 17);

term.on('data', (data) => {
    ptyProc.write(data);
});

term.on('resize', size => {
    ptyProc.resize(
        Math.max(size ? size.cols : term.cols, 1),
        Math.min(size ? size.rows : term.rows, 1)
    );
});

ptyProc.on('data', data => {
    term.write(data);
});

window.onresize = () => {
    fitDebounced();
};
