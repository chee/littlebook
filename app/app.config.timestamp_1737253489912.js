// app.config.js
import { serverFunctions } from "@vinxi/server-functions/plugin";
import { createApp } from "vinxi";
import solid from "vite-plugin-solid";
var app_config_default = createApp({
  server: {
    experimental: {
      asyncContext: true
    }
  },
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public",
      base: "/"
    },
    {
      name: "ssr",
      type: "http",
      base: "/",
      handler: "./src/server.tsx",
      target: "server",
      plugins: () => [solid({ ssr: true })],
      link: {
        client: "client"
      }
    },
    {
      name: "client",
      type: "client",
      handler: "./src/client.tsx",
      target: "browser",
      plugins: () => [serverFunctions.client(), solid({ ssr: true })],
      base: "/_build"
    },
    serverFunctions.router()
  ]
});
export {
  app_config_default as default
};
