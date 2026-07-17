# Testing

## Successful Job

```bash
node index.js enqueue "echo Hello"
```

Expected

Completed

---

## Failed Job

```bash
node index.js enqueue "abcxyz"
```

Expected

Retry 1

Retry 2

Retry 3

Dead Letter Queue

---

## Multiple Workers

```bash
node index.js worker start --count 3
```

Expected

No duplicate processing

---

## Status

```bash
node index.js status
```

Expected

Pending

Completed

Dead

etc.

---

## Config

```bash
node index.js config list
```

Expected

Configured values
