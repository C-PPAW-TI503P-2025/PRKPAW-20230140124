import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import router
import presensiRouter from "./router/presensi.js";
import reportRouter from "./router/reports.js";

const app = express();
const PORT = 3000;

// Middleware global
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Logging manual tambahan (opsional)
app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(log);
  next();
});

// ✅ Route utama (biar "/" bisa diakses)
app.get("/", (req, res) => {
  res.json({
    message: "API Presensi Aktif ✅",
    endpoints: {
      presensi: {
        checkIn: "/api/presensi/check-in",
        checkOut: "/api/presensi/check-out",
      },
      reports: {
        daily: "/api/reports/daily",
      },
    },
  });
});

// ✅ Hubungkan router
app.use("/api/presensi", presensiRouter);
app.use("/api/reports", reportRouter);

// Handler jika endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan." });
});

// Handler untuk error server
app.use((err, req, res, next) => {
  console.error("Terjadi error:", err.message);
  res.status(500).json({ error: "Terjadi kesalahan pada server." });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
