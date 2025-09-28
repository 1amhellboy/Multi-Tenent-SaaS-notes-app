import app from "./index";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Health check available at : http://localhost:${PORT}/health`);
});
