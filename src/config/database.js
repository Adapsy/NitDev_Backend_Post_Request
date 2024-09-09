import pkg from "pg"; // to impot the dataabase setup .. this is for postgres
import { config } from "./env.js";

const { Pool } = pkg; // getting the pool class from the pkg
const pool = new Pool({
	max: 100,
	host: config.db.host,
	user: config.db.user,
	database: config.db.name,
	password: config.db.password,
	port: config.db.port,
});

// this code is for executing a query for your database
export const executeQuery = (query, values = []) => {
	return new Promise((resolve, reject) => {
		pool.connect((err, client, done) => {
			if (err) {
				console.error("Error creating database connection", err.stack);
				return reject(err);
			}

			client.query(query, values, (err, results) => {
				done();
				if (err) {
					console.error("Error executing query", err);
					return reject(err);
				}
				return resolve(results.rows);
			});
		});
	});
};
