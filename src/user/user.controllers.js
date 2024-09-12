// contains the business logic and validation for the input data
// received by the client side and performs their business logic and
// sends it to database controllers, which contain logical files

// business logic refers to a set of rules, algorithms and operations thta govern your application's core functionality and behaviour
// it defines how data is exchanged and processed between the database and the user interfae
// it is responsible for tasks like data validation, storage =, retrieval, processing and user interaction

// // the controller tkes in requst and response
// export const signup = (req, res)

import {
	createUser,
	getUsers,
	getUserById,
	removeUserById,
	getUserByEmail,
} from "./user.service.js";
import { signupSchema, SignInSchema } from "./user.validator.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { sanitize } from "../utils/sanitizer.js";

//post controller
export const sign_up = async (req, res) => {
	const { error, value } = signupSchema.validate(req.body);

	if (error)
		return res.status(400).json({
			message: error.details[0].message,
		});
	// error.details[0].message takes the 1st value in the error.details object and deplays the message (.message())

	const { first_name, last_name, email, password } = value;

	const hashedPassword = await hashPassword(password);

	console.log(hashedPassword);

	const userExists = await getUserByEmail(email);

	if (userExists.length > 0)
		return res.status(409).json({
			message: ` User with email ${email} already exists`,
		});

	const [userdetails] = await createUser(
		// deconstruct
		first_name,
		last_name,
		email,
		hashedPassword
	);
	return res.status(201).json({
		message: "User created",
		data: sanitize(userdetails),
	});
};

// signIn

export const SigmIn = async (req, res) => {
	const { error, value } = SignInSchema.validate(req.body);
	if (error)
		return res.status(400).json({
			message: error.details[0].message,
		});
	const { email, password } = value;
	const [user] = await getUserByEmail(email);
	// response from the database comes back as an array so we deconstruct to get the value itself
	if (!user)
		return res.status(404).json({
			message: "No user with this email",
		});
	const isMatch = await comparePassword(password, user.password);
	if (!isMatch)
		return res.status(403).json({
			message: "invalid credentials",
		});
	const accessToken = generateToken(sanitize(user));
	return res.status(200).json({
		message: "user logged in successfully",
		accessToken: accessToken,
	});
};

// response from the database comes back as an array

//get all users controller
export const getAllUsers = async (req, res) => {
	const allUsers = await getUsers();

	return res.status(200).json({
		message: "These are all the users",
		allUsers,
	});
};

//get user by id controller
export const userById = async (req, res) => {
	const { id } = req.params;

	const singleUser = await getUserById(id);

	return res.status(200).json({
		message: `This is a user with id ${id}`,
		singleUser,
	});
};

//delete user by id controller
export const deleteUserById = async (req, res) => {
	const { id } = req.params;

	const delSingleUser = await removeUserById(id);

	return res.status(204).json({
		message: `User with id ${id} has been deleted!`,
		delSingleUser,
	});
};

// we can put all our funcions in controller
