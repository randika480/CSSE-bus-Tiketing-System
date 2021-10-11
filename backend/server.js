const app = require("./app");

const PORT = process.env.PORT || 5000;

//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
