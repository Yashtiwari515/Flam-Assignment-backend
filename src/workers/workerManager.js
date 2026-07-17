const Worker = require("./worker");

class WorkerManager {
  constructor() {
    this.workers = [];
  }

  start(count = 1) {
    for (let i = 0; i < count; i++) {
      const worker = new Worker();

      this.workers.push(worker);

      worker.start();
    }

    console.log(`Started ${count} worker(s)`);
  }

  stop() {
    this.workers.forEach((worker) => worker.stop());

    console.log("Stopping workers...");
  }
}

module.exports = new WorkerManager();
