-- Create artists table
CREATE TABLE IF NOT EXISTS "artists" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" varchar(255) NOT NULL,
    "bio" text,
    "profile_image" text,
    "banner_image" text,
    "genres" jsonb DEFAULT '[]'::jsonb,
    "monthly_listeners" integer DEFAULT 0,
    "is_verified" boolean DEFAULT false,
    "social_links" jsonb DEFAULT '{}'::jsonb,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Create albums table
CREATE TABLE IF NOT EXISTS "albums" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" varchar(255) NOT NULL,
    "description" text,
    "cover_image" text,
    "release_date" timestamp,
    "album_type" varchar(20) NOT NULL,
    "total_tracks" integer DEFAULT 0,
    "genres" jsonb DEFAULT '[]'::jsonb,
    "label" varchar(255),
    "copyright" text,
    "is_explicit" boolean DEFAULT false,
    "popularity" integer DEFAULT 0,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Create songs table
CREATE TABLE IF NOT EXISTS "songs" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" varchar(255) NOT NULL,
    "album_id" uuid REFERENCES "albums"("id") ON DELETE CASCADE,
    "track_number" integer,
    "disc_number" integer DEFAULT 1,
    "duration" integer,
    "audio_url" text NOT NULL,
    "preview_url" text,
    "lyrics" text,
    "is_explicit" boolean DEFAULT false,
    "popularity" integer DEFAULT 0,
    "play_count" integer DEFAULT 0,
    "like_count" integer DEFAULT 0,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Create playlists table
CREATE TABLE IF NOT EXISTS "playlists" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" text REFERENCES "user"("id") ON DELETE CASCADE NOT NULL,
    "name" varchar(255) NOT NULL,
    "description" text,
    "cover_image" text,
    "is_public" boolean DEFAULT true,
    "is_collaborative" boolean DEFAULT false,
    "follower_count" integer DEFAULT 0,
    "total_tracks" integer DEFAULT 0,
    "total_duration" integer DEFAULT 0,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "songs_album_id_idx" ON "songs"("album_id");
CREATE INDEX IF NOT EXISTS "playlists_user_id_idx" ON "playlists"("user_id");
CREATE INDEX IF NOT EXISTS "artists_name_idx" ON "artists"("name");
CREATE INDEX IF NOT EXISTS "albums_title_idx" ON "albums"("title");
CREATE INDEX IF NOT EXISTS "songs_title_idx" ON "songs"("title");