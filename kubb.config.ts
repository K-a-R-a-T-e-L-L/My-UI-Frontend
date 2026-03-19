/// <reference types="node" />

import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";

const openApiUrl =
  process.env.KUBB_OPENAPI_URL ?? "http://localhost:4000/api-docs-json";

const normalizeGeneratedName = (name: string) =>
  name
    .replace(/^authController/i, "")
    .replace(/^appController/i, "")
    .replace(/^AuthController/i, "")
    .replace(/^AppController/i, "")
    .replace(/^_+/, "");

export default defineConfig({
  root: ".",
  input: {
    path: openApiUrl,
  },
  output: {
    path: "./src/shared/api/generated",
    clean: true,
    extension: {
      ".ts": "",
    },
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginClient({
      output: {
        path: "./clients",
        barrelType: "named",
      },
      group: { type: "tag" },
      operations: true,
      pathParamsType: "inline",
      dataReturnType: "data",
      importPath: "../../../client",
      transformers: {
        name: normalizeGeneratedName,
      },
    }),
    pluginReactQuery({
      client: {
        importPath: "../../../client",
        dataReturnType: "data",
      },
      output: {
        path: "./hooks",
      },
      group: {
        type: "tag",
      },
      mutation: {
        methods: ["post", "put", "patch", "delete"],
      },
      paramsType: "inline",
      pathParamsType: "inline",
      suspense: false,
      transformers: {
        name: normalizeGeneratedName,
      },
    }),
  ],
});
