import dotenv from "dotenv";
import SibApi from "sib-api-v3-sdk";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const client = SibApi.ApiClient.instance;
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY

export const apiInstance = new SibApi.TransactionalEmailsApi()

export const sender = {
    email: "no-reply@thundercoil.online",
    name: "ThunderCoil"
}
