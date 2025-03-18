import request from "supertest";

// cd src/back-end
// yarn jest UserGetPortfolio.test.ts
describe("User API Tests", () => {
  const api = "http://localhost:8080";
  const userPassWord = "123456789";
  let userToken: string;

  test("POST /api/user/login", async () => {
    const response = await request(api).post("/api/user/login").send({
      email: "antonio@gmail.com",
      passWord: userPassWord,
    });

    console.log("Login Response:", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token"); // Espera receber um token

    userToken = response.body.token; // Armazena o token para requisições futuras
  });

  test("POST /api/user/portfolio", async () => {
    const response = await request(api)
      .post("/api/user/portfolio")
      .set("Authorization", `Bearer ${userToken}`);

    console.log("Portfolio Response:", response.body);

    expect(response.status).toBe(200);
  });
});
