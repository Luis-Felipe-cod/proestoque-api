import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../middlewares/errorHandler";

export class UsuarioController {
  async listar(_req: Request, res: Response, next: NextFunction) {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: { id: true, nome: true, email: true, criadoEm: true },
        orderBy: { nome: "asc" }
      });
      res.json(usuarios);
    } catch (error) { next(error); }
  }

  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) throw new AppError("Nome, email e senha são obrigatórios", 400);

      const emailJaExiste = await prisma.usuario.findUnique({ where: { email } });
      if (emailJaExiste) throw new AppError("Este e-mail já está em uso", 409);

      const usuario = await prisma.usuario.create({
        data: {
          nome: String(nome).trim(),
          email: String(email).trim().toLowerCase(),
          senha: String(senha), 
        }
      });

      const { senha: _, ...usuarioSemSenha } = usuario;
      res.status(201).json(usuarioSemSenha);
    } catch (error) { next(error); }
  }
}