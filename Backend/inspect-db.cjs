require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

async function main() {
  await client.connect();

  const result = await client.query(`
    SELECT
      table_name,
      column_name,
      data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position;
  `);

  console.table(result.rows);

  await client.end();
}

main().catch(async (error) => {
  console.error("❌", error);
  await client.end().catch(() => {});
});