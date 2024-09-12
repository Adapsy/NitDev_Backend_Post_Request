import dotenv from "dotenv";
dotenv.config();

export const config = {
	port: process.env.PORT,
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
		port: process.env.DB_PORT,
	},
	Auth : { 
		accessTokenSecretKey : process.env.TOKEN_SECRET, 
		accessTokenExpire : process.env.AccessTokenExpire
		
	}
};


// we use the env to hold configurations of our applications