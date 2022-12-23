const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log("¡Servidor encendido!"))

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})



app.get("/canciones", (req, res) => {
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    res.json(productos)
})

app.post("/canciones", (req, res) => {
    // 1
    const producto = req.body
    // 2
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    // 3
    productos.push(producto)
    // 4
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    // 5
    res.send("Producto agregado con éxito!")
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const producto = req.body
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)
    productos[index] = producto
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto modificado con éxito")
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index, 1)
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto eliminado con éxito")
})