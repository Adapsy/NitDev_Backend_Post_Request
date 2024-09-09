import { executeQuery } from "../config/database.js";

export const createAccountTable = async () => {
	const query = `
    CREATE TABLE IF NOT EXISTS Accounts (
        Id SERIAL PRIMARY KEY,
        UserId INT, 
        Account_number INT UNIQUE NOT NULL,
        Telephone_Number INT,
        FOREIGN KEY (UserId) REFERENCES users (id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
	try {
		await executeQuery(query);
		console.log("acoounts table created");
	} catch (error) {
		console.error("Error creating accounts table", error);
	}
};
// for aync wait, we add it in the try , catch block
