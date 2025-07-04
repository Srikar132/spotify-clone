import { pgTable, text, timestamp, boolean, integer , jsonb , uuid , index , uniqueIndex , varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    role: text('role').default("user"),
    banned: boolean('banned').default(false),
    banReason: text('ban_reason'),
    banExpires: timestamp('ban_expires'),
    gender: text('gender'),
    dateOfBirth: timestamp('date_of_birth'),
    marketingEmails: boolean('marketing_emails'),
    dataSharing: boolean('data_sharing'),
    isPremium : boolean('is_premium').default(false)
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
    impersonatedBy: text('impersonated_by')
});

export const account = pgTable("account", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const artists = pgTable('artists', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    bio: text('bio'),
    image: text('profile_image'),
    bannerImage: text('banner_image'),
    genres: jsonb('genres').$type<string[]>().default([]),
    monthlyListeners: integer('monthly_listeners').default(0),
    isVerified: boolean('is_verified').default(false),
    socialLinks: jsonb('social_links').$type<{
        spotify?: string;
        instagram?: string;
        twitter?: string;
        facebook?: string;
        website?: string;
    }>().default({
        spotify: '',
        instagram: '',
        twitter: '',
        facebook: '',
        website: '',
    }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const songs = pgTable('songs', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    albumId: uuid('album_id').references(() => albums.id, { onDelete: 'cascade' }),
    trackNumber: integer('track_number'),
    discNumber: integer('disc_number').default(1),
    duration: integer('duration'),
    audioUrl: text('audio_url').notNull(),
    previewUrl: text('preview_url'),
    lyrics: text('lyrics'),
    isExplicit: boolean('is_explicit').default(false),
    popularity: integer('popularity').default(0),
    playCount: integer('play_count').default(0),
    likeCount: integer('like_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const albums = pgTable('albums', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    coverImage: text('cover_image'),
    releaseDate: timestamp('release_date'),
    albumType: varchar('album_type', { length: 20 }).notNull(), // e.g., 'album', 'single', 'compilation'
    totalTracks: integer('total_tracks').default(0),
    genres: jsonb('genres').$type<string[]>().default([]),
    label: varchar('label', { length: 255 }),
    copyright: text('copyright'),
    isExplicit: boolean('is_explicit').default(false),
    popularity: integer('popularity').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const playlists = pgTable('playlists', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    coverImage: text('cover_image'),
    isPublic: boolean('is_public').default(true),
    isCollaborative: boolean('is_collaborative').default(false),
    followerCount: integer('follower_count').default(0),
    totalTracks: integer('total_tracks').default(0),
    totalDuration: integer('total_duration').default(0), // in milliseconds
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// likes
// follows
// followings
// play history
// genres
// user preferences
//




// export const userEmailIdx = uniqueIndex('user_email_idx').on(user.email);
// export const userNameIdx = index('user_username_idx').on(user.name);
// export const userRoleIdx = index('user_role_idx').on(user.role);


export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Artist = typeof artists.$inferSelect;
export type NewArtist = typeof artists.$inferInsert;

export type Album = typeof albums.$inferSelect;
export type NewAlbum = typeof albums.$inferInsert;

export type Playlist = typeof playlists.$inferSelect;
export type NewPlaylist = typeof playlists.$inferInsert;



export const schema = {
    user,
    session,
    account,
    verification,
    artists,
    songs,
    albums,
    playlists,
};