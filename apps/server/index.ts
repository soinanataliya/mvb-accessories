import build from "./build.js";

async function start() {
  const app = build({ logger: true });

  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
