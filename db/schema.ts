import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const landlords = sqliteTable('landlords', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  address: text('address'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  createdAt: integer('created_at').notNull(),
})

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  landlordId: text('landlord_id').notNull().references(() => landlords.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  tags: text('tags').notNull().default('[]'),
  createdAt: integer('created_at').notNull(),
})

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  displayName: text('display_name').notNull(),
  passwordHash: text('password_hash'),
  hexclaveUserId: text('hexclave_user_id'),
  createdAt: integer('created_at').notNull(),
})

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const contactMessages = sqliteTable('contact_messages', {
  id: text('id').primaryKey(),
  category: text('category').notNull(), // 'feature' | 'complaint' | 'bug' | 'other'
  name: text('name'),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: integer('created_at').notNull(),
})

export type Landlord = typeof landlords.$inferSelect
export type NewLandlord = typeof landlords.$inferInsert
export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type ContactMessage = typeof contactMessages.$inferSelect
export type NewContactMessage = typeof contactMessages.$inferInsert
