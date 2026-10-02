/**
 * Product Controller
 * Handles CRUD operations for products
 * @module controllers/products/products
 */
 
export class crudProducts {
	constructor() {
		getProduct();
		getAllProducts();
		createProduct();
		updateProduct();
		deleteProduct();
		
	}
	
	getProduct(req, res) {
		// Logic to get a single product by ID
		const product = {}; // Fetch product from database

		product.slug = req.params.slug;
		product.partNumber = req.params.partNumber;
		product.name = req.params.name;
		product.inventory = req.params.inventory;
		product.model = req.params.model;
		product.type = req.params.type;
		product.year = req.params.year;
		product.warranty = req.params.warranty;
		product.dimensions = req.params.dimensions;
		product.compatWith = req.params.compatWith;
		product.qtyStandards = req.params.qtyStandards;
		product.location = req.params.location;
		product.instlServices = req.params.instlServices;
		product.freight = req.params.freight;
		product.vat = req.params.vat;
		product.description = req.params.description;
		product.price = req.params.price;

		return res.json(product);
	}

	getAllProducts() {
		// Logic to get all products
		const products = req.products; // Fetch products from database
		return products;
	}

	createProduct(req, res) {
		// Logic to create a new product
		const newProduct = req.body; // Get product data from request body
		// Save newProduct to database
		return res.status(201).json(newProduct);
	}

	updateProduct(req, res) {
		// Logic to update an existing product by ID
		const updatedProduct = req.body; // Get updated product data from request body
		// Update product in database
		return res.json(updatedProduct);
	}

	deleteProduct(req, res) {
		// Logic to delete a product by ID
		const productId = req.params.id;
		// Delete product from database
		return res.status(204).send();
	}
}
