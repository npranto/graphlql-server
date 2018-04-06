const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const CUSTOMERS = [
	{ id: '1',	name: 'Kevin Williams', 	email: 'kwilliams@gmail.com', 	age: 15 },
	{ id: '2', 	name: 'James Brown', 		email: 'jbrown@gmail.com', 		age: 20 },

	{ id: '3', 	name: 'Erlich Hachman', 	email: 'ehackman@gmail.com', 	age: 25 },
	{ id: '4',	name: 'James White', 		email: 'jwhite@gmail.com', 		age: 32 },
	{ id: '5',	name: 'Raja Ball', 			email: 'rball@gmail.com', 		age: 46 }
]
const PRODUCTS = [
	{ id: 1, name: 'Chair', 	price: 15.99 	},
	{ id: 2, name: 'Pen', 		price: 2 		} ,
	{ id: 3, name: 'Fan', 		price: 29.99 	} ,
	{ id: 4, name: 'Laptop', 	price: 1099.99	} ,
	{ id: 5, name: 'Pillow', 	price: 20 		}  
]

const CustomerType = new GraphQLObjectType({
	name: 'Customer',
	fields: {
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		}
	}
})

const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: {
		id: {
			type: GraphQLInt,
		},
		name: {
			type: GraphQLString
		},
		price: {
			type: GraphQLFloat
		}
	}
})

const PersonType = new GraphQLObjectType({
	name: 'Person',
	fields: {
		id: {
			type: GraphQLString
		},
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		}
	}
})

const TodoType = new GraphQLObjectType({
	name: 'Todo',
	fields: {
		id: {
			type: GraphQLInt
		},
		title: {
			type: GraphQLString
		}
	}
})

const Root = new GraphQLObjectType({
	name: 'Root',
	fields: {
		customer: {
			type: CustomerType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve: (parentValue, args) => {
				return CUSTOMERS.find(customer => customer.id == args.id)
			}
		},
		product: {
			type: ProductType,
			args: {
				id: {
					type: GraphQLInt
				}
			},
			resolve: (parentValue, args) => {
				return PRODUCTS.find(product => product.id == args.id)
			}
		},
		products: {
			type: new GraphQLList(ProductType),
			args: {
				price: {
					type: GraphQLFloat
				}
			},
			resolve: (parentValue, args) => {
				return PRODUCTS.filter(product => product.price <= args.price)
			}
		},
		person: {
			type: PersonType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve: (parentValue, args) => {
				return axios.get(`http://localhost:3000/people/${args.id}`)
					.then(res => res.data)
			}
		},
		people: {
			type: new GraphQLList(PersonType),
			resolve: (parentValue, args) => {
				return axios.get(`http://localhost:3000/people`)
					.then(res => res.data)
			}
		}
	}
})

const Schema = new GraphQLSchema({
	query: Root
})

module.exports = Schema;