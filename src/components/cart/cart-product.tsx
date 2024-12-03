import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import type { Product } from "@/api/products/products.types";

export const CartProducts = () => {
  const [localProducts, setLocalProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const storedProducts = localStorage.getItem("basket");

    if (storedProducts) {
      setLocalProducts(JSON.parse(storedProducts));
    }
  }, []);

  const trunc = (text: string | undefined, maxLength: number): string =>
    text && text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text || "";

  return (
    <div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {localProducts.map((product) => (
            <Card className="bg-amber-950 h-[300px] flex flex-col" key={product.id}>
              <CardHeader className="text-amber-600">
                <CardTitle className="text-lg font-bold">{trunc(product.title, 60)}</CardTitle>
                <CardDescription className="text-[#e39254] text-sm line-clamp-3">
                  {trunc(product.description, 150)}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-red-600 text-base">
                <p>Price: ${product.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-blue-600 text-sm gap-[100px]">
                <p>
                  <span className="text-amber-500 font-semibold">Category:</span> {product.category}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  );
};

