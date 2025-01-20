CREATE TABLE `kofi_donations` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text,
	`data` text NOT NULL,
	`status` text DEFAULT '',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`spotify_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `track_rotations` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text,
	`playlist_id` text NOT NULL,
	`playlist_name` text NOT NULL,
	`track_id` text NOT NULL,
	`track_name` text NOT NULL,
	`track_image` text NOT NULL,
	`status` text,
	`sequence` text NOT NULL,
	`current_day` integer NOT NULL,
	`repeat_after_days` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`spotify_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text,
	`playlist_id` text NOT NULL,
	`playlist_name` text NOT NULL,
	`track_id` text NOT NULL,
	`track_name` text NOT NULL,
	`track_image` text NOT NULL,
	`position` integer NOT NULL,
	`removal_date` integer NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`spotify_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`marketing_emails` integer DEFAULT 0 NOT NULL,
	`track_rotation_emails` integer DEFAULT 0 NOT NULL,
	`track_schedule_emails` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`spotify_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`spotify_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`created_at` integer NOT NULL,
	`tokens` text NOT NULL,
	`account_type` text DEFAULT 'user' NOT NULL,
	`permissions` text DEFAULT 'user' NOT NULL,
	`customer_id` text DEFAULT '',
	`credits` integer DEFAULT 100 NOT NULL,
	`credits_used` integer DEFAULT 0 NOT NULL,
	`credits_period_end` integer DEFAULT '"2025-02-19T20:40:43.371Z"',
	`plan` text DEFAULT 'free' NOT NULL,
	`status` text DEFAULT '' NOT NULL,
	`trial_end` integer DEFAULT '"2025-01-27T20:40:43.371Z"',
	`current_period_end` integer,
	`cancel_at_period_end` integer DEFAULT 0,
	`kofi_verification_token` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_spotify_id_unique` ON `users` (`spotify_id`);