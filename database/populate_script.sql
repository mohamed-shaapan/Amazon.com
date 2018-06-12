Use bookstore;

DELETE FROM book_info;
DELETE FROM book_category;
DELETE FROM publishing_house;

# book categories
INSERT INTO book_category (id, category_name) VALUES (1, "Science");
INSERT INTO book_category (id, category_name) VALUES (2, "Art");
INSERT INTO book_category (id, category_name) VALUES (3, "Religion");
INSERT INTO book_category (id, category_name) VALUES (4, "History");
INSERT INTO book_category (id, category_name) VALUES (5, "Geography");
INSERT INTO book_category (id, category_name) VALUES (6, "Fiction");
INSERT INTO book_category (id, category_name) VALUES (7, "Fantasy");
INSERT INTO book_category (id, category_name) VALUES (8, "Mystery");
INSERT INTO book_category (id, category_name) VALUES (9, "Drama");

# publishing houses
INSERT INTO publishing_house (id, name, address, phone) VALUES (1, "Pearson", "dummy", "dummy");
INSERT INTO publishing_house (id, name, address, phone) VALUES (2, "Oxford", "dummy", "dummy");
INSERT INTO publishing_house (id, name, address, phone) VALUES (3, "Hachette", "dummy", "dummy");
INSERT INTO publishing_house (id, name, address, phone) VALUES (4, "Random House", "dummy", "dummy");
INSERT INTO publishing_house (id, name, address, phone) VALUES (5, "Penguin", "dummy", "dummy");
INSERT INTO publishing_house (id, name, address, phone) VALUES (6, "Simon & Schuster", "dummy", "dummy");

# new books
INSERT INTO book_info (isbn, title, category_id, year, publisher_id)
VALUES (123456789, "Alice In Wonderland", 7, 1880, 1);
INSERT INTO book_info (isbn, title, category_id, year, publisher_id)
VALUES (456789123, "Sherlock Holmes", 8, 1870, 2);
INSERT INTO book_info (isbn, title, category_id, year, publisher_id)
VALUES (789123456, "The Great Gatsby", 9, 1925, 3);
INSERT INTO book_info (isbn, title, category_id, year, publisher_id)
VALUES (123789456, "Pride and Prejudice", 9, 1813, 4);
INSERT INTO book_info (isbn, title, category_id, year, publisher_id)
VALUES (456123789, "The Scarlet Letter", 9, 1850, 5);

# inventory
INSERT INTO inventory (isbn, quantity, threshold, price) VALUES (123456789, 100, 20, 15.33);
INSERT INTO inventory (isbn, quantity, threshold, price) VALUES (456789123, 700, 20, 20.44);
INSERT INTO inventory (isbn, quantity, threshold, price) VALUES (789123456, 200, 20, 10.11);
INSERT INTO inventory (isbn, quantity, threshold, price) VALUES (123789456, 50, 20, 4.99);
INSERT INTO inventory (isbn, quantity, threshold, price) VALUES (456123789, 120, 20, 9.99);

