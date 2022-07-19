CREATE TABLE "route" (
  "organization_id" uuid,
  "vehicle_id" uuid,
  "driver_id" uuid,
  "name" varhcar UNIQUE,
  "starts_at" time,
  "ends_at" time,
  "travel_time" varchar,
  "total_stops" int,
  "action_id" uuid,
  "status_id" uuid,
  "created_at" timestamp DEFAULT (now()),
  PRIMARY KEY ("organization_id", "driver_id", "vehicle_id")
);

CREATE TABLE "vehicle" (
  "vehicle_id" uuid PRIMARY KEY,
  "organization_id" uuid,
  "plate" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "driver" (
  "driver_id" uuid PRIMARY KEY,
  "organization_id" uuid,
  "name" varchar,
  "last_name" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "user" (
  "subject" varchar,
  "email" varchar,
  "national_nid" varchar,
  "created_at" timestamp DEFAULT (now()),
  PRIMARY KEY ("subject", "email", "national_nid")
);

CREATE TABLE "organization" (
  "organization_id" uuid PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "action" (
  "action_id" uuid PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "status" (
  "status_id" uuid PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "route" ADD FOREIGN KEY ("organization_id") REFERENCES "organization" ("organization_id");

ALTER TABLE "route" ADD FOREIGN KEY ("vehicle_id") REFERENCES "vehicle" ("vehicle_id");

ALTER TABLE "route" ADD FOREIGN KEY ("driver_id") REFERENCES "driver" ("driver_id");

ALTER TABLE "route" ADD FOREIGN KEY ("action_id") REFERENCES "action" ("action_id");

ALTER TABLE "route" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("status_id");

ALTER TABLE "vehicle" ADD FOREIGN KEY ("organization_id") REFERENCES "organization" ("organization_id");

ALTER TABLE "driver" ADD FOREIGN KEY ("organization_id") REFERENCES "organization" ("organization_id");

INSERT INTO public.status(
status_id, name)
VALUES (uuid_generate_v4(), 'En proceso'),
(uuid_generate_v4(), 'Terminado');
	
INSERT INTO public.action(
action_id, name)
VALUES (uuid_generate_v4(), 'Llegada'),
(uuid_generate_v4(), 'Recogida');


INSERT INTO public.organization(
organization_id, name)
VALUES 
('8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2', 'Routing'),
('d95e57f9-207d-49d8-a500-b7cb65353f98', 'Pricing');

	

INSERT INTO public.vehicle(
vehicle_id, plate, organization_id)
VALUES (uuid_generate_v4(), 'VE1', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'),
(uuid_generate_v4(), 'VE2', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'),
(uuid_generate_v4(), 'VE3', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'),
(uuid_generate_v4(), 'VE4', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'),
(uuid_generate_v4(), 'VE5', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'); 

INSERT INTO public.driver(
driver_id, name, last_name, organization_id)
VALUES (uuid_generate_v4(), 'Carlos', 'Apellido', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'),
(uuid_generate_v4(), 'Adán', 'Apellido', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2'),
(uuid_generate_v4(), 'Diego', 'Apellido', '8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2');

INSERT INTO public.route(
	organization_id, vehicle_id, driver_id, starts_at, ends_at, travel_time, total_stops, action_id, status_id)
VALUES (
	'8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2', 
	'5925ba3d-7a17-4e40-a9f0-92e1a7e106ef', 
	'2cd502da-9130-4448-b2d1-43111e0eacd7', 
	'09:00:00', 
	'11:30:00',
	'2H 30M', 
	1, 
	'97e5b380-ff65-4070-81cc-20a28665bb05',
	'492b8283-b3b5-46ea-8e52-768045b13e9e'
	);

	INSERT INTO public.route(
	organization_id, vehicle_id, driver_id, starts_at, ends_at, travel_time, total_stops, action_id, status_id)
	VALUES (
		'8e4378fc-d8d5-4d07-b4f0-b3d4931b0cb2', 
		'f39a83bd-c799-423f-a3f7-00581523f37f', 
		'33c9ef30-d518-4705-8389-3d596ad37b2e', 
		'09:00:00', 
		'10:10:00',
		'1H 10M', 
		1, 
		'97e5b380-ff65-4070-81cc-20a28665bb05',
		'492b8283-b3b5-46ea-8e52-768045b13e9e'
		);

  INSERT INTO public.vehicle(
	vehicle_id, plate, organization_id )
	VALUES (uuid_generate_v4(), 'VE6', 'd95e57f9-207d-49d8-a500-b7cb65353f98'),
	(uuid_generate_v4(), 'VE7', 'd95e57f9-207d-49d8-a500-b7cb65353f98'),
	(uuid_generate_v4(), 'VE8', 'd95e57f9-207d-49d8-a500-b7cb65353f98');

  INSERT INTO public.driver(
	driver_id, organization_id, name, last_name)
	VALUES (uuid_generate_v4(), 'd95e57f9-207d-49d8-a500-b7cb65353f98', 'Andrea', 'martinez'),
	(uuid_generate_v4(), 'd95e57f9-207d-49d8-a500-b7cb65353f98', 'Mauro', 'Rojas')
	
INSERT INTO public.route(
  organization_id,
  vehicle_id,
  driver_id, 
  starts_at, 
  ends_at,
  travel_time, 
  total_stops,
  action_id,
  status_id,
  name
)
VALUES (
  'd95e57f9-207d-49d8-a500-b7cb65353f98',
  '9e9f500c-3d13-4373-831d-d0a99617d90f',
  '55d91678-7bc5-412a-9c25-02aa9df960a0',
  '11:30',
  '13:30',
  '2H',
  3,
  '97e5b380-ff65-4070-81cc-20a28665bb05',
  '492b8283-b3b5-46ea-8e52-768045b13e9e','Rota 3'
);