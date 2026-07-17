const { v4: uuid } = require("uuid");
const jobRepository = require("../repositories/job.repository");

class JobService {
  enqueue(command, maxRetries = 3) {
    if (!command || command.trim() === "") {
      throw new Error("Command is required");
    }

    const now = new Date().toISOString();

    const job = {
      id: uuid(),
      command,
      state: "pending",
      attempts: 0,
      max_retries: maxRetries,
      created_at: now,
      updated_at: now,
      next_retry_at: null,
    };

    jobRepository.create(job);

    return job;
  }

  getAllJobs() {
    return jobRepository.getAll();
  }

  getJobsByState(state) {
    return jobRepository.getByState(state);
  }

  getJob(id) {
    return jobRepository.getById(id);
  }
  getStatus() {
    const data = jobRepository.getStatus();

    const status = {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      dead: 0,
    };

    data.forEach((job) => {
      status[job.state] = job.count;
    });

    return status;
  }
}

module.exports = new JobService();
