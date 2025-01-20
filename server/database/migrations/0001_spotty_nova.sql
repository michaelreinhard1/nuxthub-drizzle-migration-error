PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
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
	`credits_period_end` integer DEFAULT '"2025-02-19T20:46:29.273Z"',
	`plan` text DEFAULT 'free' NOT NULL,
	`status` text DEFAULT '' NOT NULL,
	`trial_end` integer DEFAULT '"2025-01-27T20:46:29.273Z"',
	`current_period_end` integer,
	`cancel_at_period_end` integer DEFAULT 0,
	`kofi_verification_token` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "spotify_id", "name", "email", "created_at", "tokens", "account_type", "permissions", "customer_id", "credits", "credits_used", "credits_period_end", "plan", "status", "trial_end", "current_period_end", "cancel_at_period_end", "kofi_verification_token") SELECT "id", "spotify_id", "name", "email", "created_at", "tokens", "account_type", "permissions", "customer_id", "credits", "credits_used", "credits_period_end", "plan", "status", "trial_end", "current_period_end", "cancel_at_period_end", "kofi_verification_token" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_spotify_id_unique` ON `users` (`spotify_id`);--> statement-breakpoint
ALTER TABLE `track_rotations` ADD `last_position` integer;--> statement-breakpoint
ALTER TABLE `track_rotations` ADD `is_random` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `track_rotations` ADD `min_position` integer;--> statement-breakpoint
ALTER TABLE `track_rotations` ADD `max_position` integer;