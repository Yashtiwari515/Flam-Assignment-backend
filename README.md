# QueueCTL

A CLI-based background job queue system built with Node.js.

## Features

- Enqueue Jobs
- Multiple Workers
- Persistent SQLite Storage
- Retry with Exponential Backoff
- Dead Letter Queue
- Configurable Retry Settings
- Graceful Shutdown

---

## Installation

```bash
git clone <repo-url>

cd queuectl

npm install
```

---

## Start Worker

```bash
node index.js worker start --count 2
```

---

## Add Job

```bash
node index.js enqueue "echo Hello"
```

---

## Queue Status

```bash
node index.js status
```

---

## List Jobs

```bash
node index.js list
```

```bash
node index.js list --state pending
```

---

## Dead Letter Queue

```bash
node index.js dlq list
```

Retry

```bash
node index.js dlq retry <job-id>
```

---

## Config

```bash
node index.js config list
```

```bash
node index.js config set max-retries 5
```

```bash
node index.js config set backoff-base 3
```

---

## Project Structure

```
src/
cli/
database/
repositories/
services/
workers/
utils/
```

---

## Job Lifecycle

```
Pending

↓

Processing

↓

Completed
```

Failure

```
Pending

↓

Processing

↓

Retry

↓

Pending

↓

Retry

↓

Dead
```
