import { contentToString } from "@kitajs/html";
import { App } from "./app/App";

export function render(_url: string) {
  const html = contentToString(<App />) as string;
  return { html, head: "" };
}
