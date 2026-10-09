# Getting Started (Windows + VS Code)

Read this first, then read `ASSIGNMENT.md` for what to build and `docs/build-guide.md` for the day-by-day order of work. This file is only about **how to work**: your machine, your repository, your git routine.

You are building this alone, in **your own repository**. The other two students in the batch are building the same thing in theirs. Nobody pushes to anybody else's repo.

**Golden rule:** you never commit directly to `main`. Every piece of work happens on a branch and arrives in `main` through a Pull Request that **you read before you merge**. That sounds like pointless ceremony when you are the only developer. It is not — section 3 explains why, and it is the single habit from this project most likely to get you hired.

All commands below are typed in the **VS Code terminal** (`` Ctrl+` ``). The terminal should be **Git Bash** (see 1.3).

---

## 1. One-time setup

### 1.1 Install
Download and install these. Accept the defaults unless told otherwise.

| Tool | Link | Note |
|---|---|---|
| Git for Windows | https://git-scm.com/download/win | Keep "Git Bash Here" ticked. It also installs **Git Bash** |
| Node.js (LTS) | https://nodejs.org | Check with `node -v` and `npm -v` |
| MongoDB Community | https://www.mongodb.com/try/download/community | Tick **"Install as a Service"** so it starts on its own. Or skip it and use a free **MongoDB Atlas** cluster |
| Postman | https://www.postman.com/downloads | For testing every endpoint |
| GitHub CLI | https://cli.github.com | Makes login and PRs easy |
| VS Code | https://code.visualstudio.com | You already have it |

After installing, **close and reopen VS Code** so it finds the new tools.

### 1.2 VS Code extensions
Open Extensions (`Ctrl+Shift+X`) and install:
- **GitLens** (see who changed what, blame, history)
- **MongoDB for VS Code** (look inside your database without leaving the editor)
- **ESLint** (catches mistakes as you type)
- **DotENV** (colours `.env` files)
- **Thunder Client** (optional — a Postman-lite inside VS Code, handy for a quick check)

### 1.3 Make Git Bash your terminal
1. Open the terminal panel (`` Ctrl+` ``).
2. Click the small **down arrow** next to the `+` → **Select Default Profile** → **Git Bash**.
3. Open a new terminal. The prompt should show `MINGW64`.

Why: the commands in this guide (`cp`, `ls`, `git`) work as written in Git Bash. PowerShell uses different ones.

### 1.4 Tell git who you are
```bash
git config --global user.name "Your Name"
git config --global user.email "the-email-on-your-github-account"
git config --global core.autocrlf true
```
The last line stops Windows and other machines from fighting over line endings.

### 1.5 Log in to GitHub
```bash
gh auth login
```
Choose: **GitHub.com → HTTPS → Yes (authenticate git) → Login with a web browser**. Copy the code, approve it in the browser. Windows then remembers you (Credential Manager), so you do this once.

### 1.6 Create your own repository
Pick a folder **without spaces and not inside OneDrive**, for example `C:\dev`.

```bash
mkdir -p /c/dev/clinic-management-crm && cd /c/dev/clinic-management-crm
git init -b main
```

Copy the docs you were given (`ASSIGNMENT.md`, `GETTING_STARTED.md`, `docs/`, `.gitignore`) into this folder, then:

```bash
git add .
git commit -m "docs: add assignment and build guide"
gh repo create clinic-management-crm --private --source=. --remote=origin --push
code .
```

That creates a **private** repo under your own GitHub account and pushes `main` to it. Confirm it worked:

```bash
git remote -v          # should show your own github username
git log --oneline      # one commit
```

Add your mentor as a collaborator so they can review your PRs: on GitHub, **Settings → Collaborators → Add people**.

Keep it private. Three private repos, three students, no copying.

---

## 2. Every day, the same routine

### Start of the day (15 min)
```bash
cd /c/dev/clinic-management-crm
git checkout main
git pull                   # in case you worked on another laptop, or merged a PR in the browser
npm install                # in case you added a package yesterday
```

Then open `docs/build-guide.md`, read today's section, and **cut a branch for the first task of the day** (section 3). At eight hours a day you will do this two or three times before evening.

### While working
Commit small and often, **one commit per finished thing**. Not one commit per day.

**Option A: terminal**
```bash
git status                 # what did I change?
git diff                   # what exactly?
git add .
git commit -m "feat(patient): add duplicate phone check"
```

**Option B: VS Code Source Control** (`Ctrl+Shift+G`)
1. Click a changed file to see exactly what changed. **Read it.**
2. Click **+** next to the files (or the top **+** for all).
3. Type the message in the box and click **Commit**.
4. Check `.env` and `node_modules` are **not** in the list. If they are, stop and fix `.gitignore` before committing.

Commit message format: `type(area): what you did`

| type | use for |
|---|---|
| `feat` | new endpoint / feature |
| `fix` | bug fix |
| `refactor` | cleanup, no behavior change |
| `docs` | markdown, comments |
| `test` | Postman collection changes |
| `chore` | deps, config |

Good: `feat(queue): calculate wait time from last 20 visits`
Bad: `update`, `changes`, `final`, `asdf`

Six months from now this log is the only record of what you did. In an interview, "walk me through your commit history" is a real question.

### End of the day (30 min)
```bash
git push                   # or: git push -u origin <branch>  the first time
```

Push **every day**, even if the task is half done, even if nothing runs. Unpushed work on your laptop is invisible, unbacked-up and unprovable.

Then **re-run the whole Postman collection**, not just today's folder. It takes ninety seconds and it is the only thing standing between you and discovering on Day 11 that Day 6 broke. Fix anything red before you stop — a regression is cheapest on the day you caused it.

Finally, write one line in a notebook or a text file: what's done, what's next, what's confusing you. Bring the third one to the next class.

### Cheat sheet
| I want to | Command |
|---|---|
| See which branch I'm on | `git branch` (or bottom-left of VS Code) |
| See what I changed | `git status` and `git diff` |
| Start a task (2–3 a day) | `git checkout main && git pull && git checkout -b feat/thing` |
| Save my work | `git add .` then `git commit -m "..."` |
| Upload my work | `git push` |
| Open the PR | `gh pr create --base main --fill` |
| See history | `git log --oneline -10` (or the GitLens panel) |
| See the branches I left behind | `git branch -a` |

---

## 3. Branches and Pull Requests, working alone

### The loop

One task in the build guide = one branch = one PR. In a twelve-day sprint that loop runs **two or three times a day**, so it has to be fast — the whole cycle below is about four minutes of overhead per task.

```bash
git checkout main
git pull
git checkout -b feat/patient-crud     # name it after the task

# ...build, commit after each finished piece...

git push -u origin feat/patient-crud
gh pr create --base main --fill       # opens a PR with your commits as the description
```

Then **go to the PR on GitHub and read the whole diff, top to bottom, as if a stranger wrote it.**

This is the part that matters and the part everyone skips. Your editor shows you code while you are inside the problem. The PR diff shows you the same code from outside it, with nothing in your head about what you *meant*. Every time, you will catch at least one of:

- a `console.log` you left in
- a route missing `auth` or `authorize('doctor')`
- a query missing `{ clinic: req.clinicId }` — the single most expensive bug in this project
- a response that still contains `password` or `__v`
- a `TODO` you forgot was load-bearing

Fix what you find on the same branch, push again (the PR updates itself), then:

```bash
gh pr merge --squash --delete-branch
git checkout main && git pull
```

Use a checklist on every PR. Paste this into the description:

```
- [ ] Every new query filters by req.clinicId
- [ ] Every new route has auth + the right role
- [ ] Tested in Postman, both the happy path and the rejection
- [ ] No console.log, no .env, no commented-out code
```

Four boxes, thirty seconds. They will save you hours on Days 7 to 10 when a tenancy bug is buried under twenty commits.

### Branch names

Match them to the build guide so your history reads like the plan:

```
feat/foundation-skeleton      feat/auth
feat/patient-crud             feat/visit-crud
feat/availability-slots       feat/invoice
feat/f6-allergy-guard         feat/f3-queue
feat/f1-noshow-risk           feat/f11-subscriptions
fix/staff-notes-leak          chore/helmet-rate-limits
```

### Phase checkpoints

At the end of Days 2, 6, 10 and 12, `main` must hold a complete, working, Postman-green phase. Tag it so you can always get back to a version that ran:

```bash
git checkout main && git pull
git tag -a phase-1 -m "Foundation: auth, tenancy, plans, skeleton"
git push origin phase-1
```

Then show it to your mentor and compare with the other two students. Same checkpoint, three different codebases — that conversation is worth more than another hour of coding.

---

## 4. File rules

- **Never commit to `main` directly.** If you catch yourself typing `git commit` with `main` in the bottom-left of VS Code, stop. Section 5 has the fix.
- Never commit `.env` or `node_modules/`. Copy `.env.example` to `.env` locally and fill in your own values.
- Never commit a real `JWT_SECRET` or an Atlas connection string with a password in it. `.env.example` holds the **keys with blank or fake values**, nothing else.
- `app.js` is written once in Phase 1 with every router mounted. After that it should barely change. If you are restructuring `app.js` on Day 8, something went wrong earlier.
- Name files exactly as the assignment does (`patientController.js`, not `PatientController.js`). Windows ignores case, GitHub does not, and the mismatch only shows up when someone else clones your repo.

---

## 5. If something goes wrong

### I committed on `main` by mistake
Don't push. Move the commit onto a branch:
```bash
git branch feat/my-work            # bookmark the current state
git reset --hard origin/main       # main goes back to the pushed version
git checkout feat/my-work          # your commit is safe here
```

### I already pushed to `main` by mistake
It happens, and alone it is survivable. Leave it, note it, and go back to branching for the next task. Do not try to rewrite pushed history to hide it — rewriting is how people lose work.

### Push rejected (non-fast-forward)
Your branch on GitHub has commits you don't have locally (you probably merged the PR in the browser). Run `git pull --rebase`, then push again. Never `git push --force` unless you fully understand what it deletes.

### Conflict when merging a PR
Rare when you work alone, and it almost always means two branches were open at once and both touched the same file. Finish and merge one branch before starting the next, and this disappears.

If you are already in one:
1. `git checkout feat/my-branch && git pull --rebase origin main`
2. VS Code shows the conflicts in Source Control under **Merge Changes**. Open each file and pick the right code — read both sides, don't click "Accept Current" on reflex.
3. Make sure no `<<<<<<<`, `=======` or `>>>>>>>` lines remain. Search the whole project for `<<<<` before committing.
4. `git add <file>` then `git rebase --continue`. Want out? `git rebase --abort` puts you back.

### I deleted something I needed
```bash
git reflog                         # every state your HEAD has been in, with hashes
git checkout <hash>                # look at it
```
As long as you committed it once, it is almost certainly still there.

### Windows-specific problems
| Problem | Fix |
|---|---|
| `git`, `node` or `gh` "is not recognized" | Close **all** VS Code windows and reopen. Still failing → restart the PC |
| `npm` "running scripts is disabled" (PowerShell) | Use Git Bash. Or in PowerShell run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| "LF will be replaced by CRLF" warning | Harmless. Ignore it |
| `cp .env.example .env` doesn't work | You're in PowerShell/CMD. Switch to Git Bash, or use `copy .env.example .env` |
| Port 5000 already in use | Change `PORT` in your `.env`, or find the process: `netstat -ano \| findstr :5000` |
| Mongo connection refused | Open **Services** (`Win+R`, `services.msc`), start **MongoDB Server**. Or switch `MONGO_URI` to your Atlas string |
| Weird git errors in a OneDrive folder | Move the project to `C:\dev` |
| File names differ only by case | Windows ignores case, GitHub does not. Name files exactly as the assignment does |

---

## 6. Running the project

Once the Phase 1 foundation is in:
```bash
cp .env.example .env      # then open .env in VS Code and fill in MONGO_URI and JWT_SECRET
npm install
npm run dev
```
Check it in Postman: `GET http://localhost:5000/api/health`

Reset to clean data any time with `node seed.js`. You will run that fifty times in twelve days, which is exactly why it is a Day 1 task.

Import your collection and environment from the `postman/` folder (Postman → **Import**). Every task in the build guide ends in a request you can run. **A task is not done until that request passes.**

To debug in VS Code: open `server.js`, press `F5`, choose **Node.js**. Set breakpoints by clicking left of a line number. One breakpoint inside a controller teaches you more about what `req.user` actually contains than ten `console.log`s.

---

## 7. Do and don't

**Do**
- Check the branch name (bottom-left of VS Code) before you type a single line.
- Read your own PR diff before merging. Every time.
- Test each endpoint in Postman before you commit it.
- Keep every query scoped to the clinic (`req.clinicId`).
- Push every evening.
- Ask early. Two minutes of asking beats two hours of guessing — and the other two students are stuck on the same thing today.

**Don't**
- Commit to `main`.
- Force push.
- Commit secrets, `.env` or `node_modules`.
- Leave a day without pushing.
- Copy another student's files. You can discuss any problem in the project freely; you type your own solution.
- Skip Postman because "it obviously works".

---

## 8. Daily rhythm (8 hours)

This is a sprint: eight hours a day for twelve days. That is two or three tasks a day, so two or three branches and PRs a day — not one.

| Time | What |
|---|---|
| 15 min | Pull `main`, read today's section in `docs/build-guide.md`, cut the first branch |
| 90–120 min | One task. Commit after each finished piece |
| 20 min | Postman request for what you just built, then PR, **read your own diff**, merge |
| | Repeat that pair three or four times |
| 30 min | Push everything, **re-run the whole collection**, write one line about tomorrow |

That last 30 minutes is not optional. Re-running the full collection takes ninety seconds and it is the only thing standing between you and discovering on Day 11 that Day 6 broke.

**If you lose a day**, say so at the next checkpoint and move the end date. Do not try to do twelve hours tomorrow — the code you write at hour eleven costs you two hours on Day 10, and in a twelve-day build you have nothing to absorb that with.
