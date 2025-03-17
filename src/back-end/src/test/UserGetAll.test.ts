import request from "supertest";

// cd src/back-end
// yarn jest UserGetAll.test.ts
describe("User API Tests", () => {
  const api = "http://localhost:8080";
  const userPassWord = "123456789";
  let userToken: string;

  test("GET all", async () => {
    const response = await request(api).get("/api/user/all");

    console.log("Responde body: ", response.body);

    expect(response.status).toBe(200);
  });
});
