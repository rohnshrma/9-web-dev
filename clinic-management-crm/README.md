# Clinic Management and CRM

A multi-tenant REST API for small clinics and solo doctors — patients, visits, prescriptions, scheduling, billing, and eleven features that most clinic software doesn't bundle together.

**Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt · Postman**
**Backend only.** No frontend. Every deliverable is an endpoint, a model or a middleware, tested from Postman.

Three students in the batch. **You build the whole thing yourself, in your own repository, from these docs.** Discuss anything; copy nothing.

---

## Read these in order

| File | What it is | When |
|---|---|---|
| **`GETTING_STARTED.md`** | Install, create your repo, the daily git routine, what to do when it breaks | Day 1, before anything else |
| **`ASSIGNMENT.md`** | The product, the eleven features, the twelve days, every task with its hours | Day 1, then at the start of each phase |
| **`docs/build-guide.md`** | The order to build in and **why** that order, with the traps in each task | Every morning |

Two diagrams live in `docs/diagrams/`:
- **`roadmap.svg`** — the twelve days in one picture, and the dependencies that fix the order
- **`request-flow.svg`** — the middleware chain every request runs, and the gate each feature needs

## The shape of it

```
12-day sprint  ·  8 hrs/day  ·  96 hours  ·  4 phases

Phase 1   Days  1 to  2   16 h   Foundation: auth, multi-tenancy, the plan gate, the skeleton
Phase 2   Days  3 to  6   32 h   Patients, visits, prescriptions, scheduling, invoices
Phase 3   Days  7 to 10   32 h   The ten features that make it a product
Phase 4   Days 11 to 12   16 h   Timeline, subscriptions, hardening, the demo

checkpoints: end of Day 2, 6, 10, 12
```

Tag `main` and run the Postman collection green at the end of each phase. Then compare with the other two students — same checkpoint, three codebases, and that conversation is the most valuable hour of the week.

## The three rules that matter most

1. **Every query filters by `req.clinicId`.** Miss one and a clinic sees another clinic's patients.
2. **Nothing is committed to `main`.** One task, one branch, one PR — and you read your own diff before merging.
3. **A task is done when Postman proves it**, not when the code is written.
