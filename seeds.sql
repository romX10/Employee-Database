INSERT INTO department (department_name)
VALUES ('Services'),
       ('R&D'),
       ('Shipping');

INSERT INTO roles (title, salary, department_id)
VALUES ('Salesperson', 50000, 001),
       ('Sales Lead', 75000, 001),
       ('Scientist', 60000, 002),
       ('Head Scientist', 85000, 002),
       ('Shipping Associate', 40000, 003),
       ('Shipping Coordinator', 65000, 003);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Tony', 'Stark', 02, NULL),
       ('Steve', 'Rogers', 01, 01),
       ('Bruce', 'Banner', 01, 01),
       ('Peter', 'Parker', 04, NULL),
       ('Stephen', 'Strange', 03, 04),
       ('Miles', 'Morales', 03, 04),
       ('Natasha', 'Romanoff', 06, NULL),
       ('Thor', 'Odinson', 05, 07),
       ('Carol', 'Danvers', 05, 07);
