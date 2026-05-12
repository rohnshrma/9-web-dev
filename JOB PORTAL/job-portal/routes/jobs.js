import express from "express";
import Job from "../models/Job.js";

const router = express.Router();
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote"];

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.render("jobs/index", {
      jobs,
      success: req.query.success || "",
      error: req.query.error || "",
    });
  } catch (err) {
    res.status(500).render("jobs/index", {
      jobs: [],
      success: "",
      error: "Unable to fetch jobs right now.",
    });
  }
});

router.get("/new", (req, res) => {
  res.render("jobs/new", {
    job: {},
    types: JOB_TYPES,
    error: req.query.error || "",
  });
});

router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.redirect("/jobs?success=Job+created+successfully");
  } catch (err) {
    const error =
      err?.errors && Object.keys(err.errors).length
        ? Object.values(err.errors)
            .map((e) => e.message)
            .join(" ")
        : "Failed to create job.";

    res.status(400).render("jobs/new", {
      job: req.body,
      types: JOB_TYPES,
      error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.redirect("/jobs?error=Job+not+found");
    }

    res.render("jobs/show", {
      job,
      success: req.query.success || "",
      error: req.query.error || "",
    });
  } catch (err) {
    res.redirect("/jobs?error=Invalid+job+ID");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.redirect("/jobs?error=Job+not+found");
    }

    res.render("jobs/edit", {
      job,
      types: JOB_TYPES,
      error: req.query.error || "",
    });
  } catch (err) {
    res.redirect("/jobs?error=Invalid+job+ID");
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/jobs/${req.params.id}?success=Job+updated+successfully`);
  } catch (err) {
    const error =
      err?.errors && Object.keys(err.errors).length
        ? Object.values(err.errors)
            .map((e) => e.message)
            .join(" ")
        : "Failed to update job.";

    res.redirect(`/jobs/${req.params.id}/edit?error=${encodeURIComponent(error)}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.redirect("/jobs?success=Job+deleted+successfully");
  } catch (err) {
    res.redirect("/jobs?error=Failed+to+delete+job");
  }
});

export default router;
