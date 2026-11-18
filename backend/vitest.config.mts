import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: 'v8',
      clean: false,
      reporter: ["text", "html", "json"],
      reportsDirectory: "./coverage",
      reportOnFailure: true,
    },
  },
});