-- CREATING TABLE
CREATE TABLE "todolist" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR (250) NOT NULL
);

-- INSERTING TEST ROW INTO TO-DO LIST
 INSERT INTO "todolist" ("todo")
 	VALUES ('Take a deep breath');


