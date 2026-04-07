const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const resources = [
  {
    id: 1,
    type: "water",
    location: "Community Center A",
    status: "available",
    updatedAt: "2026-04-01"
  },
  {
    id: 2,
    type: "food",
    location: "East High School",
    status: "limited",
    updatedAt: "2026-04-02"
  },
  {
    id: 3,
    type: "medical",
    location: "Clinic 7",
    status: "available",
    updatedAt: "2026-04-03"
  }
];

app.get("/", (req, res) => {
  res.json({
    name: "ReliefOps Tracker",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.get("/resources", (req, res) => {
  res.json({
    count: resources.length,
    resources
  });
});

app.listen(port, () => {
  console.log("ReliefOps Tracker listening on port " + port);
});
