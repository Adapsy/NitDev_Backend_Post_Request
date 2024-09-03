// const express = require("express");

// const users = require("./user"); // importing the user javascrip

import express from "express";
import { users } from "./user.js";
import fs from "fs";

const app = express();
const port = 3000;
const hostname = "localhost";

app.use(express.json());

// app.get("/greet", (req, res) => {
//   res.send("David taught me how to create server");
// });

const logger = (req, res, next) => {
	const id = parseInt(req.params.id);
	if (id < 1) {
		return res.status(400).json({ message: "id must be greater than 0" });
	}
};

app.get("/getusers", (req, res) => {
	return res.json({
		message: " this are the users",
		data: users,
	});
});

app.get("/getuser/:id", logger, (req, res) => {
	const { id } = req.params; // req.params is everything attached behind the /: . it is a querying parameter
	const user = users.find((user) => user.id === parseInt(id));
	console.log(req.params);
	res.json({
		message: "These are the users",
		data: user,
	});
});
const ValidateEmail = (req, res, next) => {
	const email = req.body.email;
	const userExist = users.find((user) => user.email === email);

	if (userExist) {
		return res.status(400).json({
			message: " user with this email already exists",
		});
	}
	next();
};

const ValidateUsername = (req, res, next) => {
	const username = req.body.username;
	const EmailExist = users.find((user) => user.username === username);

	if (EmailExist) {
		return res.status(400).json({
			message: " user with this username already exists",
		});
	}
	next();
};

app.post("/signup", ValidateEmail, ValidateUsername, (req, res) => {
	console.log(req.body);

	const { username, email } = req.body;
	const id = users.length + 1;

	const newUser = {
		id,
		username,
		email,
	};

	users.push(newUser);

	const stringUsers = JSON.stringify(users);

	fs.writeFileSync(
		"/Users/Gbolu/Downloads/Nitdev_backend_node/src",
		`let users = ${stringUsers}`
	);

	return res.status(201).json({
		message: "user has been created",
		data: JSON.parse(stringUsers),
	});
});

app.listen(port, () => {
	console.log(`server is running on http://${hostname}:${port}`);
});
// we cant post on the web
// .json can only accept objects

//latency is th etime taken for a response to be answered

// middleware are functions.
// when we use middlewares, we have to add next() so it moves to the next process
