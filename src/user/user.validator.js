import joi from "joi";

export const signupSchema = joi.object({
	first_name: joi.string().min(4).required().messages({
		"string.min": "First name must be at least 5 characters long",
		"any.required": "First name is required",
	}),

	last_name: joi.string().min(4).required().messages({
		"string.min": "Last name must be at least 4 characters long",
		"any.required": "Last name is required",
	}),

	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required()
		.messages({
			"string.email": "Email must be a valid email address",
			"any.required": "Email is required",
		}),

	password: joi
		.string()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\W_]).{8,}$"))
		.required()
		.messages({
			"string.pattern.base":
				"Password must contain an uppercase letter, a lowercase letter, a special character, and be at least 8 characters long",
			"any.required": "Password is required",
		}),
});

export const SignInSchema = joi.object({
	email : joi.string().email().required(),
	password: joi.string().required()

})


// the keys i.e first_name, must be as written in the schema
// any.required - if the password is not inputed
// string.pattern.base - if any of the pattern is not followed

// .patter(new RegeExp(
// '^'))

// ^ - it shows the first character

// validtion is  defining a set of rules that controls your schema. strict rules that determine how your schema reacts
// we use npm joi
// joi is uswd to validate request.body

// This pattern enforces the following rules:

// ^: Asserts the start of the string.
// (?=.*[a-z]): Ensures that the password contains at least one lowercase letter.
// (?=.*[A-Z]): Ensures that the password contains at least one uppercase letter.
// (?=.*\d): Ensures that the password contains at least one digit.
// (?=.*[@$!%*?&]): Ensures that the password contains at least one special character from the set @$!%*?&.  we can use /w for all spcial characters [/w]
// [A-Za-z\d@$!%*?&]{8,}: Allows any combination of uppercase letters, lowercase letters, digits, and special characters, with a minimum length of 8 characters.
// $: Asserts the end of the string.


// export const sigupSchema = Joi.object({
// 	first_name: Joi.string().required().min(5),
// 	last_name: Joi.string().optional().min(5),
// 	email: Joi.string().required(),
// 	password: Joi.string()
// 		.pattern(
// 			new RegExp(
// 				"^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
// 			)
// 		)
// 		.messages({
// 			"string .pattern.base": "password must contain atleast a number, a upper letter, a lowercase letter, a special character and ",
// 			"any.required": "password is required",
// 		}),
// });