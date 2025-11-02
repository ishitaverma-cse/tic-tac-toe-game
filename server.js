const express = require("express");
const path = require("path");
const app = express();

// Serve all static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Define a default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

