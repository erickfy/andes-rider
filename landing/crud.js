const API_BASE = "http://localhost:8080/api";

// Servicio para interactuar con el Backend Spring Boot
const ApiService = {
    // ================= PRODUCTOS =================

    // Obtener todos los productos (GET)
    async getProducts() {
        try {
            const response = await fetch(`${API_BASE}/products`);
            if (!response.ok) throw new Error("Error cargando productos");
            return await response.json();
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor Backend.");
            return [];
        }
    },

    // Crear producto (POST)
    async createProduct(productData) {
        const response = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Error al crear");
        }
        return await response.json();
    },

    // Actualizar producto (PUT)
    async updateProduct(id, productData) {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al actualizar");
        return await response.json();
    },

    // Eliminar producto (DELETE)
    async deleteProduct(id) {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Error al eliminar");
        return true;
    },

    // ================= CONTACTOS =================

    // Enviar formulario de contacto (POST)
    async createContact(contactData) {
        const response = await fetch(`${API_BASE}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactData)
        });
        if (!response.ok) throw new Error("Error al enviar mensaje");
        return await response.json();
    }
};