import {
  getProducts,
  getProductsById,
  createProduct,
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
} from "../controllers/product.controller";
import { Router } from "express";
const router = Router();

router.post("/list", getProducts);
router.post("/createProduct", createProduct);
router.post("/addToWistlist", addToWishlist);
router.post("/deleteFromWishlist", deleteFromWishlist);
router.get("/details/:id", getProductsById);
router.get("/getWishlist", getWishlist);
export default router;
