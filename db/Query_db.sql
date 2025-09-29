CREATE TABLE catalogue(
	id_catalogue INT(2) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price INT(30) NOT NULL,
	image VARCHAR(100) NOT NULL,
	description TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders(
	id_order INT(2) PRIMARY KEY AUTO_INCREMENT,
	id_catalogue INT(2) NOT NULL,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(60) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	wedding_date DATE NOT NULL,
	STATUS ENUM('requested', 'approved') NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_catalogue) REFERENCES catalogue(id_catalogue) 
);

CREATE TABLE orders(
    id_order INT PRIMARY KEY AUTO_INCREMENT,
    id_catalogue INT NOT NULL,
    cust_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    wedding_date DATE NOT NULL,
    STATUS ENUM('requested', 'completed', 'cancelled') DEFAULT 'requested',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_catalogue) REFERENCES catalogue(id_catalogue) ON DELETE RESTRICT
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username,password,role) VALUES 
('admin', 'adminn123','admin');

DESCRIBE users;
SELECT * FROM users;

SELECT * FROM orders;
SELECT * FROM catalogue;

INSERT INTO catalogue
(name,price,image,DESCRIPTION)
VALUES
('Paket A', 150000, 'paket-a.png','ini adalah paket a'),
('Paket B', 200000, 'paket-b.png','ini adalah paket b');