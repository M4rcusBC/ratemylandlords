CREATE TABLE `landlords` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`landlord_id` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`landlord_id`) REFERENCES `landlords`(`id`) ON UPDATE no action ON DELETE cascade
);
