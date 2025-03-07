import app from "./app";
import { envs } from "./config/envs";

const PORT = envs.PORT;

app.listen(PORT, () => {
	console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
