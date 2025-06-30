// update-env.js
import { writeFileSync } from "fs";
import axios from "axios";

async function updateEnv() {
  try {
    const { data } = await axios.get("http://127.0.0.1:4040/api/tunnels");
    console.log("🔍 Obtendo URL do ngrok...", data);

    const backendTunnel = data.tunnels.find(t =>
      t.config.addr.endsWith(":8080")
    );

    if (!backendTunnel) {
      console.error("❌ Tunnel para porta 8080 não encontrado.");
      return;
    }

    const backendUrl = backendTunnel.public_url;

    const envContent = `VITE_BACKEND_URL=${backendUrl}\n`;
    writeFileSync("src/front-end/.env", envContent);

    console.log("✅ .env atualizado com:", backendUrl);
  } catch (error) {
    console.error("❌ Erro ao buscar URL do ngrok:", error.message);
  }
}

updateEnv();
