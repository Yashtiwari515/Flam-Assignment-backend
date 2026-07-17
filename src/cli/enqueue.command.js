const jobService = require("../services/job.service");

module.exports = (program) => {
  program
    .command("enqueue")
    .description("Add a new job")
    .argument("<command>", "Command to execute")
    .action((command) => {
      try {
        const job = jobService.enqueue(command);

        console.log("✅ Job Added");
        console.table(job);
      } catch (err) {
        console.log("❌", err.message);
      }
    });
};
