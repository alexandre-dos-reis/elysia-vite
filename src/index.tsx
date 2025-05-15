import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { exec } from "child_process";
import { watch } from "fs";
import { htmlRoutes } from "./routes";
import { devMiddleware } from "./middlewares/vite";

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
  .use(devMiddleware)
  .use(
    staticPlugin({
      assets: "public",
      prefix: "assets",
    }),
  )
  .use(htmlRoutes)
  .listen(3000, ({ hostname, port }) => {
    console.log(`Server started http://${hostname}:${port}`);
  });
