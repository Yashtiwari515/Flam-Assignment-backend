const jobService = require("../services/job.service");

module.exports = (program) => {
  program
    .command("status")
    .description("Show queue status")
    .action(() => {
      const status = jobService.getStatus();

      console.log("\n========== Queue Status ==========\n");

      console.table(status);
    });
};
