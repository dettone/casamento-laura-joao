import database from "infra/database.js";


beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("DROP schema public CASCADE; CREATE schema public;");
}

  
async function verifyMigrations() {
  const result = await database.query("SELECT * FROM pgmigrations");
  expect(result.rows.length).toBeGreaterThan(0);
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST"
  });
  expect(response.status).toBe(200);
  
  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
  await verifyMigrations();

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST"
  });
  expect(response2.status).toBe(201);
  
  const responseBody2 = await response2.json();

  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);
  
});