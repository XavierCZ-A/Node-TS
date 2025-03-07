import express from "express";
// import routes from "./routes"; // Importar las rutas

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if the server is running
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});

// Rutas
// app.use("/api", routes);

// Middleware de manejo de errores
// app.use(
// 	(
// 		err: any,
// 		req: express.Request,
// 		res: express.Response,
// 		next: express.NextFunction,
// 	) => {
// 		console.error(err);
// 		res
// 			.status(err.status || 500)
// 			.json({ message: err.message || "Internal Server Error" });
// 	},
// );

export default app;
