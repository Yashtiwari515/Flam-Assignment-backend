const jobRepository = require("../repositories/job.repository");
const calculateBackoff = require("../utils/backoff");

class RetryService {
  handleFailure(job) {
    const attempts = job.attempts + 1;

    if (attempts > job.max_retries) {
      jobRepository.moveToDead(job.id, attempts);

      console.log(`Job ${job.id} moved to Dead Letter Queue`);

      return {
        status: "dead",
      };
    }

    const delay = calculateBackoff(Number(process.env.BACKOFF_BASE), attempts);

    const nextRetry = new Date(Date.now() + delay * 1000).toISOString();

    jobRepository.retryJob(job.id, attempts, nextRetry);

    console.log(
      `Retry ${attempts}/${job.max_retries} scheduled after ${delay}s`,
    );

    return {
      status: "retry",
      delay,
    };
  }
}

module.exports = new RetryService();
