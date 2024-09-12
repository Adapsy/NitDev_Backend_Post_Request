export const sanitize = (user) => {
	const { created_at, password, ...rest } = user;
	return rest;
};
// to sanitize the values dispplayed when we get data . rest gives the other details except creatde at and password