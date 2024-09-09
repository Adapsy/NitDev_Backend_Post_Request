// // const express = require("express");

// // const users = require("./user"); // importing the user javascrip

// import express from "express";
// import { users } from "./user.js";
// import fs from "fs";
// import { config } from "./config/env.js";

// import { createUserTable } from "./user/user.mod.js";
// import { createAccountTable } from "./account/account.js";

import express from "express";
import { config } from "./config/env.js";
import { createUserTable } from "./user/user.mod.js";
import { createAccountTable } from "./account/account.js";
import {
	sign_up,
	getAllUsers,
	userById,
	deleteUserById,
} from "./user/user.controllers.js";

const app = express();
app.use(express.json());

// // app.get("/greet", (req, res) => {
// //   res.send("David taught me how to create server");
// // });

app.get("/getusers", getAllUsers);

app.get("/getuser/:id", userById);

app.post("/sign-up", sign_up);
app.delete("/delete-user/:id", deleteUserById);
app.listen(config.port, () => {
	createUserTable();
	createAccountTable();
	console.log(`server is running on http://localhost:${config.port}`);
});

// app.post("/signup", ValidateEmail, ValidateUsername, (req, res) => {
// 	const { username, email } = req.body;
// /**
//  express doesn't parse Json in the body by default
//  so we use a middile ware ((app.use(express.jSON)))
//  *  */
// 	const id = users.length + 1;

// 	const newUser = {
// 		id,
// 		username,
// 		email,
// 	};

// 	users.push(newUser);

// 	const stringUsers = JSON.stringify(users);

// 	fs.writeFileSync(
// 		"/Users/Gbolu/Downloads/Nitdev_backend_node/src/user.js",
// 		`let users = ${stringUsers}`
// 	);

// 	return res.status(201).json({
// 		message: "user has been created",
// 		data: JSON.parse(stringUsers),
// 	});
// });

// we cant post on the web
// .json can only accept objects

//latency is th etime taken for a response to be answered

// in express.js , res.send is to send an HTTP response with HTML context or other data

// middleware are functions.

// when we use middlewares, we have to add next() so it moves to the next process

// const logger = (req, res, next) => {
// 	const id = parseInt(req.params.id);
// 	if (id < 1) {
// 		return res.status(400).json({ message: "id must be greater than 0" });
// 	}
// };

// const ValidateEmail = (req, res, next) => {
// 	const email = req.body.email;
// 	const userExist = users.find((user) => user.email === email);

// 	if (userExist) {
// 		return res.status(400).json({
// 			message: " user with this email already exists",
// 		});
// 	}
// 	next();
// };

// 	if (EmailExist) {
// 		return res.status(400).json({
// 			message: " user with this username already exists",
// 		});
// 	}
// 	next();
// };
// const ValidateUsername = (req, res, next) => {
// 	const username = req.body.username;
// 	const EmailExist = users.find((user) => user.username === username);
