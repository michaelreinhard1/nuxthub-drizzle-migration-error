import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDB() {
  return drizzle(hubDatabase(), { schema })
}

export type User = typeof schema.users.$inferSelect
export type UserPreferences = typeof schema.userPreferences.$inferSelect
export type Track = typeof schema.tracks.$inferSelect
export type TrackRotation = typeof schema.trackRotations.$inferSelect
