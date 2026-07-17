const fs = require("fs");
const path = require("path");

const files = [
  "src/cli/index.js",
  "src/cli/enqueue.command.js",
  "src/cli/worker.command.js",
  "src/cli/status.command.js",
  "src/cli/list.command.js",
  "src/cli/dlq.command.js",
  "src/cli/config.command.js",

  "src/controllers/job.controller.js",
  "src/controllers/worker.controller.js",
  "src/controllers/dlq.controller.js",
  "src/controllers/config.controller.js",

  "src/routes/job.routes.js",
  "src/routes/worker.routes.js",
  "src/routes/dlq.routes.js",
  "src/routes/config.routes.js",

  "src/services/job.service.js",
  "src/services/worker.service.js",
  "src/services/retry.service.js",
  "src/services/dlq.service.js",
  "src/services/config.service.js",

  "src/repositories/job.repository.js",
  "src/repositories/config.repository.js",

  "src/database/database.js",
  "src/database/schema.sql",
  "src/database/queue.db",

  "src/workers/worker.js",
  "src/workers/workerManager.js",
  "src/workers/gracefulShutdown.js",

  "src/utils/executeCommand.js",
  "src/utils/backoff.js",
  "src/utils/logger.js",
  "src/utils/constants.js",
  "src/utils/helper.js",

  "src/models/Job.js",
  "src/models/Config.js",

  "src/middleware/error.middleware.js",

  "src/app.js",
  "src/server.js",

  "tests/enqueue.test.js",
  "tests/worker.test.js",
  "tests/retry.test.js",

  ".env",
  ".gitignore",
  "package.json",
  "README.md",
  "index.js",
];

files.forEach((file) => {
  const filePath = path.join(__dirname, file);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, "");
});

console.log("✅ QueueCTL folder structure created successfully!");
