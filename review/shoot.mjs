// Full-page screenshots at a real 1440x900 (or 390x844) viewport via Chrome DevTools Protocol.
// Usage: node review/shoot.mjs <outDir> <baseUrl> [mobile] name:/path ...
import { spawn } from 'node:child_process';
import { writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [outDir, base, ...rest] = process.argv.slice(2);
const mobile = rest[0] === 'mobile';
const shots = mobile ? rest.slice(1) : rest;
const W = mobile ? 390 : 1440, H = mobile ? 844 : 900;
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const profile = await mkdtemp(path.join(tmpdir(), 'shoot-'));
const proc = spawn(chrome, ['--headless=new', '--remote-debugging-port=9333', `--user-data-dir=${profile}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch('http://127.0.0.1:9333/json')).json()).find(t => t.type === 'page'); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
for (const s of shots) {
  const [name, route] = s.split(':');
  await send('Page.navigate', { url: base + route });
  await sleep(1800);
  // Scroll through so scroll-triggered reveals fire, then return to top.
  await send('Runtime.evaluate', { expression: `(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)})()`, awaitPromise: true });
  await sleep(1500);
  const { result } = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true });
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: result.value, scale: 1 } });
  await writeFile(path.join(outDir, `${name}.jpg`), Buffer.from(shot.data, 'base64'));
  console.log(name, result.value);
}
ws.close(); proc.kill();
