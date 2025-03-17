import request from "supertest";

// cd src/back-end
// yarn jest PortfolioGetAll.test.ts
describe("Portfolio API Tests", () => {
  const api = "http://localhost:8080";

  test("GET ALL", async () => {
    const response = await request(api).post("/api/portfolio/all");

    console.log("Responde body: ", response.body);

    expect(response.status).toBe(200);
  });
});
