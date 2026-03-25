
// Product Class (Base)

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Total value of stocks
    getTotalValue() {
        return this.price * this.quantity;
    }

    // String representations
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    // Static method apply discount
    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price = product.price * (1 - discount);
        });
    }
}


// PerishableProduct Class

class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    // Override toString
    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}


// Store Class

class Store {
    constructor() {
        this.inventory = [];
    }

    // Add products to inventory 
    addProduct(product) {
        this.inventory.push(product);
    }

    // Total inventory values
    getInventoryValue() {
        return this.inventory.reduce((total, product) => {
            return total + product.getTotalValue();
        }, 0);
    }

    // Find products by name
    findProductByName(name) {
        return this.inventory.find(product => product.name === name) || null;
    }
}


// Testing system


// Create products
const p1 = new Product("Laptop", 1000, 5);
const p2 = new Product("Mouse", 25, 20);
const p3 = new Product("Keyboard", 50, 10);

// Perishable products
const p4 = new PerishableProduct("Milk", 3, 30, "2026-04-01");
const p5 = new PerishableProduct("Bread", 2, 40, "2026-03-28");

// Create store
const store = new Store();

// Add products to store
store.addProduct(p1);
store.addProduct(p2);
store.addProduct(p3);
store.addProduct(p4);
store.addProduct(p5);

// Before discount
console.log("=== BEFORE DISCOUNT ===");
store.inventory.forEach(p => console.log(p.toString()));
console.log("Total Inventory Value: $" + store.getInventoryValue().toFixed(2));

// Apply 15% discount
Product.applyDiscount(store.inventory, 0.15);

// After discount
console.log("\n=== AFTER 15% DISCOUNT ===");
store.inventory.forEach(p => console.log(p.toString()));
console.log("Total Inventory Value: $" + store.getInventoryValue().toFixed(2));

// Find product
const searchName = "Milk";
const foundProduct = store.findProductByName(searchName);

console.log("\n=== SEARCH RESULT ===");
if (foundProduct) {
    console.log(foundProduct.toString());
} else {
    console.log("Product not found");
}