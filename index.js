// installing dependencies
const express = require('express');
const expressGraphQl = require('express-graphql');
const Schema = require('./schema');

// initializing express app
const app = express();

// middlewares
app.use('/graphql', expressGraphQl({
	schema: Schema,
	graphiql: true
}))

// initializing and listening to port
const PORT = 4444;
app.listen(PORT, () => {
	console.log(`Listening to PORT ${PORT}`);
})