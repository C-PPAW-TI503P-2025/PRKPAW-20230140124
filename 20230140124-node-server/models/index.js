const { Sequelize, DataTypes } = require("sequelize");
const PresensiModel = require("./presensi");
const UserModel = require("./user"); // ← tambahkan ini

const sequelize = new Sequelize("praktikum_124_db", "root", "MieAyam678", {
  host: "127.0.0.1",
  port: 3309,
  dialect: "mysql",
  logging: false,
});

// Inisialisasi semua model
const Presensi = PresensiModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes); // ← dan ini

// Kalau nanti ada relasi antar tabel, bisa didefinisikan di sini
// Contoh: User.hasMany(Presensi); Presensi.belongsTo(User);

const db = { sequelize, Sequelize, Presensi, User };
module.exports = db;
