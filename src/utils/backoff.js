function calculateBackoff(base, attempts) {
  return Math.pow(base, attempts);
}

module.exports = calculateBackoff;
