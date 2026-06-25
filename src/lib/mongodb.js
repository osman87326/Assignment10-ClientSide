import { ObjectId } from "mongodb";
import { getDb } from "@/db";

export { ObjectId };

export async function getLessonsCollection() {
  const db = await getDb();
  return db.collection("lessons");
}

export async function getFavoritesCollection() {
  const db = await getDb();
  return db.collection("favorites");
}

export async function getCommentsCollection() {
  const db = await getDb();
  return db.collection("comments");
}

export async function getReportsCollection() {
  const db = await getDb();
  return db.collection("lessonsReports");
}

export async function getUsersCollection() {
  const db = await getDb();
  return db.collection("user");
}

export function toObjectId(id) {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}
