import database from "infra/database.js";


export default async function ListaDeConvidados() {
  const data = await database.query("SELECT * FROM convidados");
  return data.rows;
}
