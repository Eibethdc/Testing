const request = require("supertest");
const server = require("../index.js");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () =>{
        const response = await request(server).get('/cafes').send()
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object)
    });
    it("DELETE /cafes/:id debe devolver un código 404 si el ID del café no existe", async () =>{
        const jwt = "jsonwebtoken";
        const { status } = await request(server).delete("/cafes/10").set("Authorization", jwt).send();

        expect(status).toBe(404);
    });
    it("POST /cafes agrega un nuevo café y devuelve un código 201", async () =>{
        const nuevoCafe = {
            "id": 5,
            "nombre": "Latte Vainilla"
        }

        const response = await request(server).post('/cafes').send(nuevoCafe)
        expect(response.body).toContainEqual(nuevoCafe)
        expect(response.status).toBe(201)
    });
    it("PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () =>{
        const actualizarCafe = {
            id: 4,
            nombre: 'Cappuccino Vainilla'
        };
        const response = await request(server).put('/cafes/6').send(actualizarCafe);
        expect(response.status).toBe(400);
    })
});
