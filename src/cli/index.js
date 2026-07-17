require("../database/database");

const { Command } = require("commander");

const enqueueCommand = require("./enqueue.command");
const workerCommand = require("./worker.command");
const statusCommand = require("./status.command");
const listCommand = require("./list.command");
const dlqCommand = require("./dlq.command");
const configCommand = require("./config.command");


process.on("SIGINT", () => {

    console.log("\nGracefully shutting down...");

    process.exit(0);

});
const program = new Command();

program
  .name("queuectl")
  .description("Background Job Queue CLI")
  .version("1.0.0");

enqueueCommand(program);
workerCommand(program);
configCommand(program);
statusCommand(program);
dlqCommand(program);
listCommand(program);
program.parse(process.argv);
