import mongoose from "mongoose";
import { wishlistItem } from "../shared/models";

const wishlistShema = new mongoose.Schema<wishlistItem>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    idUser: {
      type: String,
      required: true,
    },
    idProduct: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model<wishlistItem>("Wishlist", wishlistShema);

export default Wishlist;
