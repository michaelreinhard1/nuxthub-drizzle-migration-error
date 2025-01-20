import { relations } from 'drizzle-orm'
import {
  sqliteTable,
  text,
  integer
} from 'drizzle-orm/sqlite-core'
import type { TrackStatus } from '~~/app/types'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  spotifyId: text('spotify_id').notNull().unique(), // Ensure spotifyId is unique
  name: text('name').notNull(),
  email: text('email'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  tokens: text('tokens').notNull(),
  accountType: text('account_type').default('user').notNull(),
  permissions: text('permissions').default('user').notNull(),
  customerId: text('customer_id').default(''),
  credits: integer('credits').default(100).notNull(),
  creditsUsed: integer('credits_used').default(0).notNull(),
  creditsPeriodEnd: integer('credits_period_end', { mode: 'timestamp' }).default(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ),
  plan: text('plan').default('free').notNull(),
  status: text('status').default('').notNull(),
  trialEnd: integer('trial_end', { mode: 'timestamp' }).default(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ),
  currentPeriodEnd: integer('current_period_end', {
    mode: 'timestamp'
  }),
  cancelAtPeriodEnd: integer('cancel_at_period_end').default(0),
  kofiVerificationToken: text('kofi_verification_token')
})

export const userRelations = relations(users, ({ many, one }) => ({
  tracks: many(tracks),
  kofiDonations: many(kofiDonations),
  trackRotations: many(trackRotations),
  userPreferences: one(userPreferences, {
    fields: [users.spotifyId],
    references: [userPreferences.userId]
  })
}))

export const userPreferences = sqliteTable('user_preferences', {
  id: integer('id').primaryKey(),
  userId: text('user_id').references(() => users.spotifyId).notNull(),
  marketingEmails: integer('marketing_emails').default(0).notNull(),
  trackRotationEmails: integer('track_rotation_emails').default(0).notNull(),
  trackScheduleEmails: integer('track_schedule_emails').default(0).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const userPreferenceRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.spotifyId]
  })
}))

export const tracks = sqliteTable('tracks', {
  id: integer('id').primaryKey(),
  userId: text('user_id').references(() => users.spotifyId),
  playlistId: text('playlist_id').notNull(),
  playlistName: text('playlist_name').notNull(),
  trackId: text('track_id').notNull(),
  trackName: text('track_name').notNull(),
  trackImage: text('track_image').notNull(),
  position: integer('position').notNull(),
  removalDate: integer('removal_date', { mode: 'timestamp' }).notNull(),
  status: text('status').$type<TrackStatus>().default('scheduled').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const trackRelations = relations(tracks, ({ one }) => ({
  user: one(users, {
    fields: [tracks.userId],
    references: [users.spotifyId]
  })
}))

export const trackRotations = sqliteTable('track_rotations', {
  id: integer('id').primaryKey(),
  userId: text('user_id').references(() => users.spotifyId),
  playlistId: text('playlist_id').notNull(),
  playlistName: text('playlist_name').notNull(),
  trackId: text('track_id').notNull(),
  trackName: text('track_name').notNull(),
  trackImage: text('track_image').notNull(),
  status: text('status'),
  sequence: text('sequence').notNull(),
  lastPosition: integer('last_position'),
  isRandom: integer('is_random').default(0),
  minPosition: integer('min_position'),
  maxPosition: integer('max_position'),
  currentDay: integer('current_day').notNull(),
  repeatAfterDays: integer('repeat_after_days').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const trackRotationRelations = relations(trackRotations, ({ one }) => ({
  user: one(users, {
    fields: [trackRotations.userId],
    references: [users.spotifyId]
  })
}))

export const kofiDonations = sqliteTable('kofi_donations', {
  id: integer('id').primaryKey(),
  userId: text('user_id').references(() => users.spotifyId),
  data: text('data').notNull(),
  status: text('status').default('')
})

export const kofiDonationRelations = relations(kofiDonations, ({ one }) => ({
  user: one(users, {
    fields: [kofiDonations.userId],
    references: [users.spotifyId]
  })
}))
