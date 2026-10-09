# Clinic Management and CRM: A CRM Doctors Can Actually Buy

**Stack:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Postman
**You:** one developer, the whole backend
**Time:** a **12-day sprint**, 8 hrs/day = **96 hrs**, 4 phases
**Branches:** `main` (stable), one short-lived branch per task

## How this assignment works

There are three of you in the batch. **You are each building your own Clinic Management and CRM, alone, in your own repository, from this same set of docs.**

That means:
- Nobody owns "half" the project. Every model, every controller, every middleware in here is yours to write.
- You will hit every part of a real backend: auth, multi-tenancy, scheduling, money, reports, feature gating, hardening. Nothing is handed to you finished.
- You can talk to the other two. Compare how you solved the slot generator, argue about where the no-show score should live, show each other a Postman trick. **What you cannot do is copy their files.** Two identical repos is two people who learned half as much.
- At each checkpoint all three of you will have built the same thing in three different ways. That comparison is the most valuable part of the batch. Come to the checkpoint ready to explain your choices.

Read `GETTING_STARTED.md` for the setup and the git routine. Read `docs/build-guide.md` for the **day-by-day** order of work and why that order. This file is **what** you are building.

### This is a sprint, so read this once

Twelve days at eight hours is 96 hours of focused work, and the plan below accounts for every one of them. There is no padding in it. That has consequences:

- **A lost day is not recoverable by "working harder tomorrow."** Twelve-hour days produce worse code than eight-hour days, and the bugs you write at hour eleven cost two hours on Day 10. If you lose a day, say so at the checkpoint and move the end date, don't compress.
- **Postman is not a Day 12 activity.** From Day 7 onward the test requests are folded into each feature's hours, because the only thing holding a 96-hour build together is being able to re-run everything in ninety seconds.
- **The checkpoints are Days 2, 6, 10 and 12.** Those are the four moments where you stop, run the collection green, tag `main`, and compare with the other two. Skipping one to "save time" is how Day 11 becomes a debugging session instead of a build day.

## The Product

**Scope: REST API only.** No frontend, no UI, no HTML pages. Every deliverable is an endpoint, a model or a middleware, and everything is tested from Postman. (A frontend team could build on top of it later.)

A backend for small clinics and solo doctors. Any doctor registers through the API, gets their own clinic space, picks a plan and starts using it. Every clinic's data is fully separate (multi-tenant).

**Roles**
- `doctor`: clinic owner. Full access, buys the plan, creates staff.
- `staff`: receptionist / nurse. Books, registers, bills. **Cannot** read clinical notes or revenue reports.
- Patients do **not** log in. They get a secure share link (see F5).

### What makes it different

Most clinic software is a patient list plus a calendar. These eleven features are built around what actually costs a small clinic money and time. Check them against current competitors before you pitch it. Some tools have one or two of them, few have all of them together.

| # | Feature | Problem it solves | Day |
|---|---|---|---|
| F1 | **No-show risk score** with reasons, plus overbooking suggestion | Empty slots = lost income | 9 |
| F2 | **Follow-up engine**: rules per diagnosis, "gone cold" patient list | Patients who never come back for the follow-up | 10 |
| F3 | **Live queue with honest wait time** (walk-ins + appointments in one line, ETA from real consult durations) | "How long will I wait?" | 9 |
| F4 | **Revenue leakage report**: visits with no invoice, unpaid balances, missed follow-ups | Money the doctor never notices they lost | 10 |
| F5 | **Expiring share link** for referral / summary, revocable, view count | Sending records over WhatsApp with no control | 8 |
| F6 | **Allergy and drug-interaction guard** on every prescription, override needs a reason | Patient safety and liability | 7 |
| F7 | **Unified patient timeline** with vitals trends | Doctor gets the whole story in one API call | 11 |
| F8 | **Audit log**: who opened which patient record, when | Privacy, staff snooping | 8 |
| F9 | **Shorthand snippets + Rx templates** (`htn` expands to "Hypertension", a whole prescription applied per diagnosis in one API call) | Typing the same notes all day | 7–8 |
| F10 | **Morning brief**: one call for today's day (appointments, risky no-shows, overdue follow-ups) | Everything for the day in one API response | 10 |
| F11 | **Plans and feature gating** (Free / Pro / Clinic) | Lets any doctor buy and be billed | 11 |

---

## The 12 Days

| Day | What you build | Hrs | |
|---|---|---|---|
| 1 | Skeleton, config, error handling, Clinic + User, auth, seed | 8 | |
| 2 | Tenancy middleware, staff, the plan gate, Phase-2 schemas | 8 | **checkpoint 1** |
| 3 | Patients: CRUD, search, duplicates. Visit model | 8 | |
| 4 | Visits, the notes rule, vitals series, prescriptions | 8 | |
| 5 | Availability and the slot generator | 8 | |
| 6 | Appointments, services, invoices, payments | 8 | **checkpoint 2** |
| 7 | F6 allergy guard, F9a snippets | 8 | |
| 8 | F9b Rx templates, F8 audit log, F5 share link | 8 | |
| 9 | F3 live queue, F1 no-show risk | 8 | |
| 10 | F2 follow-ups, F4 leakage, F10 morning brief | 8 | **checkpoint 3** |
| 11 | F7 timeline, F11 subscriptions, the gating pass | 8 | |
| 12 | Stats, export, hardening, full run, docs, demo | 8 | **ship** |

---

## The Rules You Work Under

You have no partner to conflict with, so the discipline is different. These five rules are what keep a 96-hour sprint from turning into spaghetti you abandon on Day 8.

### 1. One task, one branch, one PR

Never build on `main`. At eight hours a day that is **two or three branches a day**, not one:

```
git checkout main
git pull
git checkout -b feat/patient-crud
...build, commit small...
git push -u origin feat/patient-crud
gh pr create --base main --fill
```

Then **read your own diff on GitHub before you merge it.** Top to bottom, like a stranger wrote it. It takes four minutes and you will catch a leftover `console.log`, a route missing `auth`, a query missing `clinic` — every single time. That read is the whole point; merging is the easy part. See `GETTING_STARTED.md` section 3.

### 2. The data contract is frozen

Decide these on Day 1 and never drift, because a dozen later features read them:

- Every tenant model has `clinic: ObjectId (ref Clinic, required, indexed)`.
- `req.user = { id, role, clinic }` and `req.clinicId`, both set by your middleware.
- **Every** query filters by `req.clinicId`. No exceptions.
- `Patient._id` is used everywhere as `patient`. `Visit._id` as `visit`.
- `Visit.diagnosisTags: [String]` (lowercase). The follow-up rules match on these.
- `Visit.status: 'open' | 'closed'`, `Visit.startedAt`, `Visit.endedAt` (the queue uses them for average consult time).
- `Clinic.plan: 'free' | 'pro' | 'clinic'`, `Clinic.planExpiresAt`.
- Standard responses: `{ success: true, data }` and `{ success: false, message }`.

Write these at the top of your own `docs/API.md` on Day 1. When Day 9 you is confused about whether a field is `diagnosisTags` or `tags`, Day 1 you has already answered it.

### 3. The skeleton goes up first

In the first two hours of Day 1 you create `app.js` and mount **every** router in the project — all twenty of them — as empty `express.Router()` placeholders. After Day 2, `app.js` barely changes again. Adding a feature then means writing a controller and filling in a route file, never restructuring the app. In a twelve-day build you cannot afford a Day 8 refactor.

### 4. A task is done when Postman proves it

Not when the code is written. Not when it "should work". Every task in the build guide ends in a request you can run, and from Day 7 the request is written in the **same commit** as the feature. On Day 12 you need the whole thing to run green in the collection runner, and a collection written in a panic on Day 11 will not.

### 5. Push every single day

Even half-finished work. Even a broken branch. Unpushed work on one laptop is invisible and one spilled coffee from gone — and in a twelve-day sprint you have no time to rebuild a lost day.

### Folder structure

```
clinic-management-crm/
├── config/         db.js env.js interactions.js plans.js
├── middleware/     auth.js role.js tenant.js error.js audit.js checkFeature.js validate.js
├── models/         User Clinic Patient Visit Prescription RxTemplate Snippet ShareLink
│                   AuditLog Availability Appointment QueueToken FollowUp FollowUpRule
│                   Invoice Service Subscription
├── controllers/    auth staff patient visit prescription rxTemplate snippet share audit
│                   timeline export availability appointment queue noShow followUp invoice
│                   service report brief subscription stats
├── routes/         one file per controller, same names
├── postman/        clinic-crm.collection.json  clinic-crm.environment.json
├── docs/           API.md
├── seed.js
├── app.js
└── server.js
```

Seventeen models, twenty-two controllers, twelve days. It looks impossible on Day 1. It is about three files an hour, and more than half of them are forty lines long.

---

## Phase 1: Foundation (Days 1 to 2, 16 hrs)

Nothing in this phase is a feature. It is the chassis that all eleven features bolt onto, and every mistake you make here you pay for eleven times over. Build it in this exact order: each step runs the one before it.

### Day 1 — skeleton to first login (8 h)

| # | Task | Hrs |
|---|---|---|
| 1 | `package.json` with **all** deps (`express mongoose dotenv bcryptjs jsonwebtoken cors morgan helmet express-rate-limit`, dev `nodemon`), scripts `start` and `dev` | 0.5 |
| 2 | `app.js` and `server.js`: mount **every** route file under `/api/...`, each an empty router for now. `GET /api/health` | 1.5 |
| 3 | `config/env.js` (PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, crash at startup if one is missing), `config/db.js`, `.env.example` | 1 |
| 4 | `middleware/error.js`: 404 handler, central handler, Mongoose duplicate key → 409, `CastError` → 400, `ValidationError` → 400 | 0.5 |
| 5 | `Clinic` model: `name`, `owner`, `plan` (default free), `planExpiresAt`, `phone`, `address`. `User` model: `name`, `email` unique, `password` (`select:false`, bcrypt `pre('save')` hook, `comparePassword` method), `role`, `clinic`, `isActive` | 1 |
| 6 | Postman environment (`baseUrl`, `doctorToken`, `staffToken`, `clinicId`) and the health request. Set it up **now**, before there is anything to test, so every task from here on can end in a saved request | 0.5 |
| 7 | Auth: `POST /api/auth/register` (creates the clinic **and** the doctor together), `POST /api/auth/login`, `GET /api/auth/me`. JWT payload `{ id, role, clinic }` | 2 |
| 8 | `seed.js`: one demo clinic, one doctor, one staff. You will run this fifty times in twelve days | 1 |

**End of Day 1:** you can register a doctor and log in. That is the hardest single day in the project and it is behind you.

### Day 2 — tenancy, staff, the gate (8 h)

| # | Task | Hrs |
|---|---|---|
| 9 | Middleware: `auth.js` (verify token, set `req.user`), `role.js` (`authorize('doctor')`), `tenant.js` (set `req.clinicId`). Three tiny separate functions. Test each alone before chaining | 2 |
| 10 | Staff: `POST/GET/PATCH /api/staff`, doctor only. Deactivating sets `isActive: false`, and login must then refuse that user | 1.5 |
| 11 | `middleware/validate.js`: `requireFields([...])` and `validateObjectId('id')`, both return 400 before any database call | 0.5 |
| 12 | `config/plans.js`: Free / Pro / Clinic feature flags (table at the end of Phase 4). `middleware/checkFeature.js`: a factory, `checkFeature('queue')` loads the clinic, treats an expired `planExpiresAt` as free, returns **402** with the feature name if it isn't in the plan | 1.5 |
| 13 | Model schemas only, no controllers: `Availability`, `Appointment`, `Invoice`. Writing them now forces you to settle Phase 2's shape while the contract is fresh | 1.5 |
| 14 | Postman: the auth and staff requests, with test scripts that save `doctorToken` and `staffToken` into the environment | 1 |

**Checkpoint 1 (end of Day 2).** Register a doctor, log in, create staff, log in as staff, hit `/api/health`. Then deliberately break things: no token → 401. Garbage token → 401. Staff on a doctor-only route → 403. Deactivated staff logging in → 401. Register with a duplicate email → 409, not a 500 stack trace.

Tag `phase-1`. Compare with the other two: how did each of you keep register from leaving an orphan clinic behind when the second write fails?

---

## Phase 2: Core Clinic Work (Days 3 to 6, 32 hrs)

The boring half, and the half everything else reads. Patients and visits first, because appointments and invoices point at them.

### Day 3 — patients (8 h)

| # | Task | Hrs |
|---|---|---|
| 1 | `Patient` model: `name`, `phone`, `age`, `gender`, `bloodGroup`, `allergies[]`, `chronicConditions[]`, `notes`, `isArchived`, `clinic` | 1 |
| 2 | Patient CRUD + search (`?q=` on name or phone) + pagination (`?page=&limit=`). "Delete" sets `isArchived: true`, it never removes a row | 3.5 |
| 3 | Duplicate check: same `phone` and a similar name in the same clinic → 409 with the existing patient's id in the body, so the receptionist can jump straight to them | 1 |
| 4 | `Visit` model: `patient`, `doctor`, `chiefComplaint`, `vitals` (`bp`, `pulse`, `temp`, `weight`, `spo2`), `examination`, `diagnosisTags[]`, `clinicalNotes`, `status`, `startedAt`, `endedAt` | 1.5 |
| 5 | Postman: the whole patients folder, happy path and both rejections | 1 |

### Day 4 — visits and prescriptions (8 h)

| # | Task | Hrs |
|---|---|---|
| 6 | Visit CRUD: open a visit, update it, close it (sets `endedAt` and `status: 'closed'`). `clinicalNotes` is visible to `doctor` only — if `req.user.role === 'staff'`, strip it. **Do that in one shared helper**, so a route added on Day 11 cannot forget it | 3.5 |
| 7 | `GET /api/patients/:id/vitals?type=bp` returns that one vital as a time series, `[{ date, value }]` sorted by date | 2 |
| 8 | `Prescription` model (`visit`, `patient`, `medicines[]`: name, dose, frequency, days, instructions) + CRUD | 2.5 |

### Day 5 — availability and slots (8 h)

| # | Task | Hrs |
|---|---|---|
| 9 | `Availability`: weekly working hours, slot length in minutes, breaks, leaves and holidays. CRUD, doctor only | 3 |
| 10 | `GET /api/appointments/slots?date=` = that weekday's working hours cut into slots, minus breaks, minus existing non-cancelled appointments, minus leave days. **Write the generator as a pure function** you can call with fake data and check by hand | 3 |
| 11 | `Appointment` create: book a slot, validate the `patient` exists in this clinic, status `booked` | 2 |

### Day 6 — appointments and money (8 h)

| # | Task | Hrs |
|---|---|---|
| 12 | Appointment reschedule, cancel, confirm. Statuses `booked → confirmed → completed / cancelled / no-show`, and reject transitions that make no sense. **Block double booking** in the controller *and* with a unique partial index on `(clinic, doctor, start)` for non-cancelled ones | 2.5 |
| 13 | Appointment filters: `?date=&status=&patient=` | 1 |
| 14 | `Service` model (the price list: consultation, dressing, ECG…) + CRUD | 1 |
| 15 | `Invoice` model: `patient`, `visit` (optional), `items[]` (service, qty, price), `discount`, `total`, `payments[]` (amount, mode, date), `status` (`unpaid / partial / paid`). Invoice number per clinic, `INV-0001`, generated inside the create call | 2.5 |
| 16 | `POST /api/invoices/:id/pay`: push the payment, recompute `status` from the totals, reject `amount > balance` with 400 | 1 |

**Checkpoint 2 (end of Day 6).**
- Staff registers a patient. Same phone again → 409 with the existing id.
- Doctor opens a visit and writes notes. Staff fetches the same visit → `clinicalNotes` is missing from the response.
- Register a **second** clinic. Its doctor requests the first clinic's patient by id → **404, not 403.** A 403 admits the record exists.
- Book a slot, book the same slot again → rejected. Book on a leave day → rejected.
- Invoice: pay half → `partial`, pay the rest → `paid`, pay one rupee more → 400.

Tag `phase-2`. Half the sprint is gone and the whole clinic works. Compare: whose slot generator survives a 45-minute lunch break that starts mid-slot?

---

## Phase 3: The Features Nobody Else Bundles (Days 7 to 10, 32 hrs)

This is the phase that makes it a product instead of a CRUD exercise. The order is deliberate: F6 extends the prescription controller you just finished, F8 comes before F5 because the share route is the one place you deliberately skip the audit middleware, and F4 and F10 aggregate the others so they go last.

**From here the Postman requests are inside each estimate.** Write the request in the same commit as the feature. There is no catch-up day.

### Day 7 — safety (8 h)

| # | Task | Hrs |
|---|---|---|
| 1 | **F6 Allergy and interaction guard.** `config/interactions.js`: two plain objects — `allergyClasses` (`penicillin: ['amoxicillin', 'ampicillin', ...]`) and `riskyPairs` (`[['warfarin', 'aspirin', 'high'], ...]`), 20 to 30 entries to start. On `POST /api/prescriptions`: load the patient, lowercase every medicine name, check each against `patient.allergies`, then check every pair against `riskyPairs`. Build `warnings: [{ type, severity, message }]`. Any `high` warning with no `overrideReason` in the body → **400 with the warnings**. With `overrideReason` → save, and store the reason and the warnings on the prescription | 5.5 |
| 2 | **F9a Snippets.** `Snippet { shortcut, expansion }` CRUD. `POST /api/snippets/expand` takes `{ text }`, replaces every `;shortcut` with its expansion, returns the new text | 2.5 |

### Day 8 — templates, audit, the public door (8 h)

| # | Task | Hrs |
|---|---|---|
| 3 | **F9b Rx templates.** `RxTemplate { name, diagnosisTag, medicines[] }`. `POST /api/visits/:id/apply-template/:templateId` copies the template's medicines into a new prescription for that visit — **through the F6 check**, so a template cannot smuggle a drug past the guard | 2.5 |
| 4 | **F8 Audit log.** `AuditLog { user, action, patient, ip, at }`. `middleware/audit.js` attaches to the GET routes of patient, visit and prescription and writes an entry once the response is decided. `GET /api/audit?patient=&user=&from=&to=`, doctor only | 3 |
| 5 | **F5 Share link.** `ShareLink { patient, visit, token, expiresAt, revokedAt, views, scope }`, `token = crypto.randomBytes(32).toString('hex')`. The doctor creates one with a `scope` and an expiry. The public `GET /api/share/:token` has **no auth middleware at all**: find by token, revoked or expired → **410**, otherwise return only the fields `scope` allows (never the phone, never `clinicalNotes`) and `views += 1` | 2.5 |

### Day 9 — the intelligence (8 h)

| # | Task | Hrs |
|---|---|---|
| 6 | **F3 Live queue.** `QueueToken { patient, appointment?, tokenNumber, type: 'walk-in'\|'appointment', status: waiting/in-consult/done/skipped, arrivedAt }`. `tokenNumber` restarts every day, per clinic. Endpoints: check in, call next, skip, finish. **ETA** = people ahead × the average duration of the last 20 closed visits (`endedAt - startedAt`, sorted by `endedAt` desc, limit 20); no closed visits yet → fall back to the slot length. Call next prefers an appointment patient over a walk-in when their slot time is within a few minutes | 4 |
| 7 | **F1 No-show risk.** `GET /api/appointments/:id/risk` → `{ score: 0-100, level, reasons[] }`. Rule based, no ML. Add points for: past no-shows for this patient, first-time patient, booked more than 14 days ahead, still unconfirmed, slot at 8 am or after 6 pm, cancelled and rebooked before. Cap at 100, and every point you add pushes a sentence a human can read into `reasons`. `GET /api/appointments/risky?date=` filters by level. `GET /api/appointments/overbook-suggestion?date=` lists the slots whose booking is high risk | 4 |

### Day 10 — following up and the big picture (8 h)

| # | Task | Hrs |
|---|---|---|
| 8 | **F2 Follow-up engine.** `FollowUpRule { diagnosisTag, afterDays, reason }`, `FollowUp { patient, visit, dueDate, status: pending/done/missed }`. `POST /api/followups/generate/:visitId` reads the visit's `diagnosisTags`, finds the matching rules, creates one follow-up per match with `dueDate = visit.endedAt + afterDays`. **Make it idempotent** — calling it twice must not double the rows. `GET /api/followups/overdue`, and `GET /api/followups/gone-cold?days=60` = patients with an overdue follow-up **and** no visit since | 3.5 |
| 9 | **F4 Revenue leakage.** `GET /api/reports/leakage?from=&to=`, doctor only. Three queries: closed visits with no invoice, invoices unpaid for over 7 days, missed follow-ups. Multiply by the clinic's average consultation `Service.price` for a rough rupee estimate per line | 2 |
| 10 | **F10 Morning brief.** `GET /api/brief/today`: today's appointment count, the high-risk no-shows, overdue follow-ups, yesterday's unpaid invoices, the queue so far. Run them in parallel with `Promise.all`, and **reuse the functions from the tasks above** rather than writing the logic a second time | 2.5 |

**Checkpoint 3 (end of Day 10).**
- Prescribe amoxicillin to a patient whose `allergies` contain penicillin → blocked, with a readable warning. Retry with an `overrideReason` → saved, and the reason is on the record.
- Apply an Rx template containing that same drug → also blocked. (If it saves, your template bypassed the guard. Fix it.)
- Share link: call it in Postman with **no auth header** → trimmed data, no phone, no notes. Revoke it → 410. Set a 1-minute expiry, wait, call again → 410.
- Audit: staff opens a patient → an entry appears in the doctor's audit list with the right user and IP.
- Queue: check in three people, read the ETA, finish one consult, read it again → it changed.
- Risk: a patient with two past no-shows, booked 20 days ahead, unconfirmed, at 7 pm → high score, and `reasons` explains exactly why in plain English.
- Close a visit tagged `hypertension` with a 14-day rule in place, generate follow-ups → one is created 14 days out. Call it again → still one.

Tag `phase-3`. Compare: whose `reasons[]` would you actually be willing to show a doctor?

---

## Phase 4: Timeline, Plans, Shipping (Days 11 to 12, 16 hrs)

Everything exists. Now it becomes sellable: one call that tells the whole story, a plan the doctor pays for, and the hardening that stops it leaking.

### Day 11 — timeline, plans, the gating pass (8 h)

| # | Task | Hrs |
|---|---|---|
| 1 | **F7 Timeline.** `GET /api/patients/:id/timeline?type=&from=&to=`. Query visits, prescriptions, invoices, appointments and follow-ups, map each into the same `{ type, date, summary, refId }` shape, concatenate, sort by date, then apply the filters. Five models, one sorted array | 3 |
| 2 | **F11 Subscriptions.** `Subscription { clinic, plan, startedAt, expiresAt, status }`. `GET /api/plans`, `POST /api/subscription/upgrade` (payment is **mocked** — just record it), `GET /api/subscription`. The upgrade updates `Clinic.plan` and `Clinic.planExpiresAt`. An expired clinic falls back to Free inside `checkFeature` | 3 |
| 3 | Apply `checkFeature(...)` across **every** gated route in one deliberate pass. Snippets, templates, queue, risk, follow-ups, brief: Pro. Audit, share links, leakage, stats: Clinic. Also enforce the limits, not just the features: 50 patients on Free, 0 / 2 / 10 staff accounts. This is where the middleware you wrote on Day 2 finally earns its place — and where you find the three routes you forgot | 2 |

### Day 12 — hardening and ship (8 h)

| # | Task | Hrs |
|---|---|---|
| 4 | `GET /api/stats`, doctor only. Four `aggregate` pipelines: patients per month, revenue per day, top diagnoses, no-show rate | 1.5 |
| 5 | Export: `GET /api/patients/:id/export`, the full record as JSON, doctor only, and it writes an audit entry | 1 |
| 6 | Hardening: `helmet`, a rate limit on login **and** on the public share route, `password` and internal fields stripped from every response, an ObjectId check on every `:id` param, consistent error shapes everywhere | 2.5 |
| 7 | Full Postman run, top to bottom, in one environment, from an empty database. Fix what breaks. Export the collection | 1.5 |
| 8 | `docs/API.md`: one table, every endpoint, one line each, with its role and plan requirement | 1 |
| 9 | Rehearse the demo script once, end to end | 0.5 |

**Plan table (`config/plans.js`)**

| Feature | Free | Pro | Clinic |
|---|---|---|---|
| Patients, visits, prescriptions, appointments, invoices | up to 50 patients | unlimited | unlimited |
| Staff accounts | 0 | 2 | 10 |
| Allergy guard | yes | yes | yes |
| Queue, snippets, templates | no | yes | yes |
| No-show risk, follow-up engine, morning brief | no | yes | yes |
| Leakage report, audit log, share links, stats | no | no | yes |

**Final demo (end of Day 12).** From an empty database, in Postman, no manual edits to the database at any point:

1. Register a new doctor — a clinic is created with them.
2. Add a staff member. (On Free this must fail with a 402. Note that.)
3. Upgrade to Clinic. Show the plan change.
4. Add staff, register two patients, set up availability.
5. Book an appointment. Book the same slot again → rejected.
6. Check two walk-ins into the queue, call next, read the honest ETA.
7. Open a visit, close it, prescribe something that trips the allergy guard, then override it with a reason.
8. Generate follow-ups from the diagnosis tag.
9. Create a share link, open it with no token, revoke it, open it again → 410.
10. Call the morning brief, the leakage report and the patient timeline.
11. Show the audit log listing every record you just opened.

If every one of those eleven steps runs green in front of the batch, you have built a backend a clinic could actually run on — in twelve days.

---

## Time Split

| Phase | Days | Hours |
|---|---|---|
| 1. Foundation | 1 to 2 | 16 |
| 2. Core clinic work | 3 to 6 | 32 |
| 3. Differentiator features | 7 to 10 | 32 |
| 4. Timeline, plans, shipping | 11 to 12 | 16 |
| **Total** | **12** | **96** |

Twelve days at eight hours. If your batch runs six-hour days, the same 96 hours is 16 days — move the end date, don't drop features. A half-built F3 is worth less than an honest "F3 is next".

## Done Means

- [ ] Every route has the right `auth`, `authorize` and `checkFeature`
- [ ] Every query is scoped by `clinic` — proven by testing with two clinics, not by reading the code
- [ ] Staff can never read `clinicalNotes` or any revenue report
- [ ] The Postman collection runs green end to end, from an empty database
- [ ] `main` holds every feature, no leftover conflict markers, no commits made directly on it
- [ ] `.env` is ignored, `.env.example` is committed
- [ ] `docs/API.md` lists every endpoint
- [ ] The demo script runs start to finish with no manual database edits
