import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { exec } from "child_process";
import { watch } from "fs";
import { html } from "@elysiajs/html";
import { htmlRoutes } from "./routes";

const buildCSS = () =>
  new Promise((resolve) =>
    exec(
      "tailwindcss -i ./src/app.css -o ./public/output.css",
      (_error, _stdout, stderr) => {
        console.log(stderr);
        resolve(null);
      },
    ),
  );

await buildCSS();

const watcher = watch("./public", { recursive: true }, async () => {
  await buildCSS();
});

process.on("SIGINT", () => {
  watcher.close();
  process.exit(0);
});

new Elysia()
  .use(
    staticPlugin({
      assets: "public",
      prefix: "assets",
    }),
  )
  .use(html({ autoDetect: true, autoDoctype: true }))
  // TODO: only on dev
  // Usefull for reloading css in dev
  .onRequest(({ set }) => {
    set.headers["Surrogate-Control"] = "no-store";
    set.headers["Cache-Control"] =
      "no-store, no-cache, must-revalidate, proxy-revalidate";
    set.headers["pragma"] = "no-cache";
    set.headers.expires = "0";
  })
  .use(htmlRoutes)
  .listen(3000, ({ hostname, port }) => {
    console.log(`Server started http://${hostname}:${port}`);
  });
