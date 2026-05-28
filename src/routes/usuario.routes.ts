import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();
const controller = new UsuarioController();

router.get("/", controller.listar.bind(controller));
router.post("/", controller.criar.bind(controller));

export { router as usuarioRouter };