import dotenv from "dotenv";

dotenv.config();

process.env.JWT_SECRET ??= "test_jwt_secret_for_vitest";
process.env.DATABASE_URL ??=
  "postgresql://user:password@localhost:5432/testdb";
