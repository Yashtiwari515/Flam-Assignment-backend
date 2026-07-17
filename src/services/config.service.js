const configRepository = require("../repositories/config.repository");

class ConfigService {
  set(key, value) {
    const allowed = ["max-retries", "backoff-base"];

    if (!allowed.includes(key)) {
      throw new Error("Invalid config key");
    }

    configRepository.set(key, value);
  }

  get(key) {
    return configRepository.get(key);
  }

  getAll() {
    return configRepository.getAll();
  }
}

module.exports = new ConfigService();
