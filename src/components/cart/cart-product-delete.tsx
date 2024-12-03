import type { Product } from "@/api/products/products.types";
import { Button } from "@/components/ui/button"; 
import { X } from "lucide-react";

interface RemoveLocalProductProps {
  product: Product; 
}

export const RemoveLocalProduct = ({ product }: RemoveLocalProductProps) => {
  const deleteProduct = () => {
   
  };

  return (
    <div>
      <Button onClick={deleteProduct}> <X className="h-3.5 w-3.5" /></Button>
    </div>
  );
};
