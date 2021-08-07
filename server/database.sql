CREATE DATABASE jwttutorial;

-- create extension if not exists "uuid-ossp";

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- \x off;
-- select * from users;

insert into users (user_name, user_email, user_password)
values ('andrew', 'andrew@gmail.com', 'password');