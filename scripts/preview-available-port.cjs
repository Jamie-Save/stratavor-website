const { execSync } = require('child_process');
const net = require('net');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

function findAvailablePort(startPort, maxAttempts) {
  return new Promise((resolve, reject) => {
    let p = startPort;

    const tryListen = () => {
      if (p >= startPort + maxAttempts) {
        reject(
          new Error(
            `No free port between ${startPort} and ${startPort + maxAttempts - 1}`
          )
        );
        return;
      }

      const server = net.createServer();
      server.unref();
      server.once('error', () => {
        p += 1;
        tryListen();
      });
      // Omit host so Node uses the same dual-stack rule as `next start` (avoids false
      // "free" when only 0.0.0.0 was probed but :: is already taken).
      server.listen(p, () => {
        const addr = server.address();
        const port = typeof addr === 'object' && addr ? addr.port : p;
        server.close(() => resolve(port));
      });
    };

    tryListen();
  });
}

async function main() {
  const start = parseInt(process.env.PREVIEW_PORT_START || '4004', 10);
  const max = parseInt(process.env.PREVIEW_PORT_ATTEMPTS || '100', 10);
  const port = await findAvailablePort(start, max);

  console.log('');
  console.log(`Preview: http://localhost:${port}/  (Ctrl+C to stop)`);
  console.log(
    'If the page looks unstyled: stop this server, run npm run build, then start again. Do not run two builds against the same preview. Prefer Chrome/Edge over an embedded browser.',
  );
  console.log('');

  execSync(`npm run start -- -p ${port}`, {
    stdio: 'inherit',
    cwd: projectRoot,
    env: process.env,
  });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
