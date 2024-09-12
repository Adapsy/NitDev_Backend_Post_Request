// for maintainability and modularity it is best to keep your core business logic in a folder called services.
// this folder can help abstract complex operations, databse queries and data validation
// for aync wait, we add it in the try , catch block

// we abstract the logic from controllers

import { executeQuery } from "../config/database.js";

//post user query
export const createUser = async (first_name, last_name, email, password) => {
	try {
		const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;

		const result = await executeQuery(query, [
			first_name,
			last_name,
			email,
			password,
		]);

		return result;
	} catch (error) {
		console.log("Error inserting into users!!!", error);
	}
};

//get all users query
export const getUsers = async () => {
	try {
		const query = `SELECT * FROM users ORDER BY ID ASC`;

		const result = await executeQuery(query);

		return result;
	} catch (error) {
		console.log("Error getting users", error);
	}
};

//get single user by id query
export const getUserById = async (id) => {
	try {
		const query = `SELECT * FROM users WHERE id = $1`;

		const result = await executeQuery(query, [id]);

		return result;
	} catch (error) {
		console.log("Cannot get id", error);
	}
};

//delete user by id query
export const removeUserById = async (id) => {
	try {
		const query = `DELETE FROM users WHERE id = $1 RETURNING *`;

		const result = await executeQuery(query, [id]);

		return result;
	} catch (error) {
		console.log(`Cannot delete user with id ${id}`, error);
	}
};
export const getUserByEmail = async (email) => {
	try {
		const query = `SELECT * FROM users WHERE email = $1`;

		const res = await executeQuery(query, [email]);

		return res;
	} catch (error) {}
};
