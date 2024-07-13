import migrationRunner from 'node-pg-migrate'
import { join } from 'node:path'
import database from 'infra/database.js'

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient()
  const defaultConfig = {
    dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true
  }
  if(request.method === "GET") { 
    const pendingMigrations = await migrationRunner(
      {
      ...defaultConfig
      }
    )
    await dbClient.end()
    return response.status(200).json(pendingMigrations)
  }

  if(request.method === "POST") {
    const migratedMigrations = await migrationRunner(
      {
     ...defaultConfig,
      dryRun: false
      }
    );
    if(migratedMigrations.length === 0) {
      return response.status(201).json(migratedMigrations)
    }
   return  response.status(200).json(migratedMigrations)
  }
  await dbClient.end()


  return response.status(405).end()

}