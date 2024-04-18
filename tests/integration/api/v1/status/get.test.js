test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.updated_at).toBeDefined();
  
  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  
  expect(responseBody.updated_at).toEqual(parseUpdatedAt)
  expect(responseBody.dependencies.postgrees.max_connections).toBeDefined()
  expect(responseBody.dependencies.postgrees.opened_connections).toEqual(1)
  expect(responseBody.dependencies.postgrees.version).toBeDefined()  
});


