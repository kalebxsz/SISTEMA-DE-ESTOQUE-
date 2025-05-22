import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const productController = new ProductController();

router.post("/products", productController.create);
router.get("/products", productController.list);
router.get("/products/:id", productController.getOne);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

export default router; 