const configService = require("../services/config.service");

module.exports = (program) => {
  const config = program.command("config");

  config
    .command("set")
    .argument("<key>")
    .argument("<value>")
    .description("Set configuration")
    .action((key, value) => {
      try {
        configService.set(key, value);

        console.log(`✅ ${key} updated`);
      } catch (err) {
        console.log(err.message);
      }
    });

  config
    .command("list")
    .description("Show all configs")
    .action(() => {
      console.table(configService.getAll());
    });
};
