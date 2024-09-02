import express, { Router } from "express"
import cors from "cors"
import dotenv from "dotenv"
import routerUsuario from "./routers/usuario_routes.js"
import routerEstudiante from "./routers/estudiantes_routes.js"
import routerMaterias from "./routers/materias_routes.js"
import routerMatriculas from "./routers/matriculas_routes.js"

const app = express()
dotenv.config()

app.set("port", process.env.port || 3000 ) 

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Server on")
})


//Routes
app.use("/api", routerUsuario)
app.use("/api", routerEstudiante)
app.use("/api", routerMaterias)
app.use("/api", routerMatriculas)


//Ruta no encontrada
app.use((req, res)=> res.status(404).send("Endpont no encontrado - 404"))


export default app