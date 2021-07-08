-- database name: "seed_to_feed"

-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"farmer" BOOLEAN NOT NULL,
	"buyer" BOOLEAN NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"super_admin" BOOLEAN DEFAULT FALSE,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- "access_level" VARCHAR (6) DEFAULT 'Member'


CREATE TABLE "field" (
	"id" serial NOT NULL,
	"year" DATE,
	"location" TEXT,
	"acres" FLOAT,
	"field_note" TEXT,
	"name" varchar(255),
	"image" VARCHAR(255),
	"shape_file" TEXT,
	"gmo" BOOLEAN,
	"crop_id" integer NOT NULL,
	CONSTRAINT "field_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "crop" (
	"id" serial NOT NULL,
	"crop_type" varchar(255) NOT NULL,
	CONSTRAINT "crop_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "transaction_type" (
	"id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"workflow_images" varchar(255),
	CONSTRAINT "transaction_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "contract" (
	"id" serial NOT NULL,
	"user_field_id" integer NOT NULL,
	"commodity" integer NOT NULL,
	"open_status" integer NOT NULL,
	"bushel_uid" integer NOT NULL UNIQUE,
	"quantity_fulfilled" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"protein" FLOAT,
	"oil" FLOAT NOT NULL,
	"moisture" FLOAT,
	"contract_quantity" FLOAT NOT NULL,
	"container_serial" integer NOT NULL,
	"contract_handler" varchar(255) NOT NULL,
	CONSTRAINT "contract_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "NIR" (
	"id" serial NOT NULL,
	"field_id" integer NOT NULL,
	"oil" FLOAT,
	"moisture" FLOAT,
	"protein" FLOAT,
	"energy" FLOAT,
	"amino_acids" FLOAT NOT NULL,
	"tested_at" TIMESTAMP NOT NULL,
	CONSTRAINT "NIR_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "field_transactions" (
	"id" serial NOT NULL,
	"field_id" integer NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	"status_notes" TEXT NOT NULL,
	"image" varchar(255) NOT NULL,
	"field_status" TEXT NOT NULL,
	"transaction_type" integer NOT NULL,
	CONSTRAINT "field_transactions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "user_field" (
	"id" serial NOT NULL,
	"field_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "user_field_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "arbitrary_data" (
	"id" serial NOT NULL,
	"key" varchar(255),
	"value" varchar(255),
	"field_trans_id" integer NOT NULL,
	CONSTRAINT "arbitrary_data_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "contract_status" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "contract_status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "field" ADD CONSTRAINT "field_fk0" FOREIGN KEY ("crop_id") REFERENCES "crop"("id") ON DELETE CASCADE;
ALTER TABLE "contract" ADD CONSTRAINT "contract_fk0" FOREIGN KEY ("user_field_id") REFERENCES "user_field"("id") ON DELETE CASCADE;
ALTER TABLE "contract" ADD CONSTRAINT "contract_fk1" FOREIGN KEY ("commodity") REFERENCES "crop"("id") ON DELETE CASCADE;
ALTER TABLE "contract" ADD CONSTRAINT "contract_fk2" FOREIGN KEY ("open_status") REFERENCES "contract_status"("id") ON DELETE CASCADE;
ALTER TABLE "NIR" ADD CONSTRAINT "NIR_fk0" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE CASCADE;
ALTER TABLE "field_transactions" ADD CONSTRAINT "field_transactions_fk0" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE CASCADE;
ALTER TABLE "field_transactions" ADD CONSTRAINT "field_transactions_fk1" FOREIGN KEY ("transaction_type") REFERENCES "transaction_type"("id") ON DELETE CASCADE;
ALTER TABLE "user_field" ADD CONSTRAINT "user_field_fk0" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE CASCADE;
ALTER TABLE "user_field" ADD CONSTRAINT "user_field_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
ALTER TABLE "arbitrary_data" ADD CONSTRAINT "arbitrary_data_fk0" FOREIGN KEY ("field_trans_id") REFERENCES "field_transactions"("id") ON DELETE CASCADE;




-- Crop Drop Setup
INSERT INTO "crop" (crop_type) VALUES ('barley'), ('corn'), ('oats'), ('soybeans'), ('sugarbeets'), ('wheat');

-- workflow steps of the supply chain: pre-planting, plant, application, harvest (farm & elevator), processing, transit, feed


-- this is the insert for the contract statuses - however you need to change the "order" to nullable, not sure what that is

INSERT INTO "contract_status" ("name") VALUES ('created'), ('pending'), ('signed'), ('delivered'), ('paid'), ('fulfilled');

INSERT INTO "user" ("username", "password", "farmer", "buyer", "first_name", "last_name", "super_admin") VALUES ('jim@field.com','1234','true','true','James','Doe','false');

INSERT INTO "field" ("year", "location", "acres", "field_note", "name", "image", "shape_file", "gmo", "crop_id") VALUES ('05-01-2021', 'grandfarm', 5,'testing plot','test plot 1', null , null, 'true','4');

INSERT INTO "user_field" ("field_id", "user_id") VALUES ('1', '1');

-- Joining the user to the field table
SELECT * FROM "field"
JOIN "user_field" ON ("user_field"."field_id" = "field"."id")
JOIN "user" ON ("user"."id" = "user_field"."user_id");

-- Displaying the crop to the field
SELECT * FROM "field"
JOIN "crop" ON ("crop"."id"="field"."crop_id");


INSERT INTO "NIR" (field_id, oil, moisture, protein, energy, amino_acids, tested_at) VALUES ('1', '20', '10', '50','60', '200', '07-02-2021');

INSERT INTO "contract" ("user_field_id", "commodity", "open_status", "bushel_uid", "quantity_fulfilled", "price", "protein", "oil", "moisture", "contract_quantity", "container_serial", "contract_handler")
VALUES (1, 4, 2, 222, 100, 1, .3, .5, .6, .7, 200, 'Bushel');

INSERT INTO "transaction_type" ("id", "name") VALUES ('1', 'pre-planting');
INSERT INTO "transaction_type" ("id", "name") VALUES ('2', 'plant');
INSERT INTO "transaction_type" ("id", "name") VALUES ('3', 'application');
INSERT INTO "transaction_type" ("id", "name") VALUES ('4', 'harvest farm');
INSERT INTO "transaction_type" ("id", "name") VALUES ('5', 'elevator');
INSERT INTO "transaction_type" ("id", "name") VALUES ('6', 'processing');
INSERT INTO "transaction_type" ("id", "name") VALUES ('7', 'transit');

-- need inserts to target images

-- not sure if this is doing what it should be doing
-- SELECT * FROM "contract"
-- JOIN "user" ON ("user"."id"="contract"."user_field_id");


-- This would get us the user information AND the field information on the contract
-- Tying contract to field
-- This gets all farmers for the field
-- This works IF the contract table uses "field_id"

-- before fix
-- SELECT * FROM "contract"
-- JOIN "field" ON ("field"."id"="contract"."field_id")
-- JOIN "user_field" ON ("user_field"."field_id"="field"."id")
-- JOIN "user" ON ("user"."id"="user_field"."user_id")
-- WHERE "user"."farmer"=true;

-- Tying contract to user_field
-- This gets only a single farmer
-- This works IF the contract table uses "user_field_id"
SELECT * FROM "contract"
JOIN "user_field" ON ("user_field"."id"="contract"."user_field_id")
JOIN "user" ON ("user"."id"="user_field"."user_id")
JOIN "field" ON ("field"."id"="user_field"."field_id");

INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "image", "field_status", "transaction_type") VALUES ('1', '04-24-2021', 'fertilizer', 'none', 'pre-planting', '3');

SELECT * FROM "field_transactions";

/* 

Test Farmers

jim@field.com   1234
jason@field.com  1234

*/