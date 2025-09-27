CREATE TABLE catalogue(
	id_catalogue INT(2) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price INT(30) NOT NULL,
	image VARCHAR(100) NOT NULL,
	description TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM catalogue;

INSERT INTO catalogue
(name,price,image,DESCRIPTION)
VALUES
('Paket A', 150000, 'paket-a.png','ini adalah paket a'),
('Paket B', 200000, 'paket-b.png','ini adalah paket b');