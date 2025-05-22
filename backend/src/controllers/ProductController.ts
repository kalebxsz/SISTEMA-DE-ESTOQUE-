import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Product } from "../entities/Product";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().min(0),
  category: z.string(),
  sku: z.string(),
  minimumStock: z.number().int().min(0).optional()
});

export class ProductController {
  async create(req: Request, res: Response) {
    try {
      const data = productSchema.parse(req.body);
      const productRepository = AppDataSource.getRepository(Product);
      const product = productRepository.create(data);
      await productRepository.save(product);
      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const productRepository = AppDataSource.getRepository(Product);
      const products = await productRepository.find();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id });
      
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.json(product);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = productSchema.partial().parse(req.body);
      const productRepository = AppDataSource.getRepository(Product);
      
      const product = await productRepository.findOneBy({ id });
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      productRepository.merge(product, data);
      await productRepository.save(product);
      return res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productRepository = AppDataSource.getRepository(Product);
      
      const product = await productRepository.findOneBy({ id });
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await productRepository.remove(product);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
} 