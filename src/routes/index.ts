import { Router } from "express";
import { produtoRouter } from "./produto.routes";
import { categoriaRouter } from "./categoria.routes";
import { usuarioRouter } from "./usuario.routes";

const router = Router();

router.use("/produtos", produtoRouter);
router.use("/categorias", categoriaRouter);
router.use("/usuarios", usuarioRouter);

export { router };