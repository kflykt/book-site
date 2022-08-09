
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Books (
    book_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL
);

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