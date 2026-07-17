const jobService = require("../services/job.service");

module.exports = (program) => {
  program
    .command("list")
    .description("List jobs by state")
    .option("-s, --state <state>", "Job state")
    .action((options) => {
      let jobs;

      if (options.state) {
        jobs = jobService.getJobsByState(options.state);
      } else {
        jobs = jobService.getAllJobs();
      }

      console.table(jobs);
    });
};
