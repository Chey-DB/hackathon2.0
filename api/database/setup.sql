DROP TABLE IF EXISTS user_accounts;
DROP TABLE IF EXISTS diary_entries;
DROP TABLE IF EXISTS tokens;

CREATE TABLE user_accounts (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    age INT NOT NULL,
    country VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    reason VARCHAR(500) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE diary_entries (
    diary_entry_id INT GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(30) NOT NULL,
    diary_entry VARCHAR(5000) NOT NULL,
    date DATE NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (diary_entry_id),
    FOREIGN KEY (user_id) REFERENCES user_accounts("user_id")
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_accounts("user_id")
);
