import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/api/products/products.types";

interface BasketProductProps {
  product: Product;
}

export const BasketProduct = ({ product }: BasketProductProps) => {

    const addToBasket = (product: Product) => {
        const basket = JSON.parse(localStorage.getItem("basket") || "[]");
        basket.push(product);
        localStorage.setItem("basket", JSON.stringify(basket));
    }

  return (
    <Button className="w-[50px] h-[40px] bg-yellow-400" onClick={() => addToBasket(product)}>
      <ShoppingCart />
    </Button>
  );
};
