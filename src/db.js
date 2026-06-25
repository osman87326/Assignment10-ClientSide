import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const globalForMongo = globalThis;

let mongoClient = null;
let mongoClientPromise = null;

if (uri && !globalForMongo._mongoClientPromise) {
  mongoClient = new MongoClient(uri);
  globalForMongo._mongoClientPromise = mongoClient.connect();
  mongoClientPromise = globalForMongo._mongoClientPromise;
}

export const client = uri ? mongoClient ?? new MongoClient(uri) : null;

export async function getDb() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!mongoClientPromise) {
    mongoClient = new MongoClient(uri);
    mongoClientPromise = mongoClient.connect();
    globalForMongo._mongoClientPromise = mongoClientPromise;
  }

  await mongoClientPromise;
  return mongoClient.db("DigitalLifeLessons");
}
