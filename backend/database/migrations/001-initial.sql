
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Books (
    bookId INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT ''
);

CREATE UNIQUE INDEX uixd_title_author ON Books (title, author);

INSERT INTO Books (title, author)
VALUES ('Luova värityskirjani', 'Nelli Orell');

INSERT INTO Books (title, author)
VALUES ('Hildur', 'Satu Rämö');

INSERT INTO Books (title, author)
VALUES ('Perintö', 'Nora Roberts');

INSERT INTO Books (title, author)
VALUES ('Finnish Nightmares', 'Karoliina Korhonen');

INSERT INTO Books (title, author)
VALUES ('Myöhemmin', 'Stephen King');

INSERT INTO Books (title, author)
VALUES ('Orkideatarha', 'Lucinda Riley');

INSERT INTO Books (title, author)
VALUES ('Hyvä historia', 'Rutger Bregman');


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Books;