import { Client } from "pg";

async function getNewClient() {
  const newClient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });
  await newClient.connect();
  return newClient;
}

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    console.log(client)
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query,
  getNewClient
};