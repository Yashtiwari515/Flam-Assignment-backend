const jobRepository = require("../repositories/job.repository");
const executeCommand = require("../utils/executeCommand");
const retryService = require("../services/retry.service");

class Worker {

    constructor() {
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    async start() {

        console.log("🚀 Worker Started");

        while (this.running) {

            const job = jobRepository.claimNextJob();

            if (!job) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                continue;
            }

            console.log(`🚀 Processing : ${job.command}`);

            try {

                await executeCommand(job.command);

                jobRepository.markCompleted(job.id);

                console.log(`✅ Completed : ${job.command}`);

            } catch (err) {

                retryService.handleFailure(job);

            }

        }

        console.log("👋 Worker Stopped Gracefully");

    }
}

module.exports = Worker;