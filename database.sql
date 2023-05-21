-- CREATING TABLE
CREATE TABLE "todolist" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR (250) NOT NULL,
	"complete" VARCHAR (4) DEFAULT 'no'
);

-- INSERTING TEST ROW INTO TO-DO LIST
 INSERT INTO "todolist" ("todo")
 	VALUES ('Take a deep breath');

-- SELECT ALL FROM TO-DO LIST
SELECT * FROM "todolist";

-- TESTING DELETE FOR ROUTER
DELETE FROM "todolist" WHERE "id"=4;
