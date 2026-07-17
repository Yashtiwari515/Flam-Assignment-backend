const dlqService = require("../services/dlq.service");

module.exports = (program) => {
  const dlq = program.command("dlq");

  dlq
    .command("list")
    .description("List dead jobs")
    .action(() => {
      console.table(dlqService.list());
    });

  dlq
    .command("retry")
    .argument("<jobId>")
    .description("Retry a dead job")
    .action((jobId) => {
      try {
        dlqService.retry(jobId);

        console.log("✅ Job moved back to pending");
      } catch (err) {
        console.log(err.message);
      }
    });
};
