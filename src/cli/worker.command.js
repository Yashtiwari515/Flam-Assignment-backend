const workerManager = require("../workers/workerManager");

module.exports = (program) => {
  const worker = program.command("worker");

  worker
    .command("start")
    .option("-c, --count <count>", "Workers", "1")
    .action((options) => {
      workerManager.start(Number(options.count));
    });

  worker
    .command("stop")
    .description("Stop workers")
    .action(() => {
      workerManager.stop();
    });
};
