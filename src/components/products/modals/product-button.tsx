import { routes } from "@/config/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { SquareArrowOutUpRight } from "lucide-react";

interface AboutTheProductProps {
  product: {
    id: number;
  };
}

export const AboutTheProduct = ({ product }: AboutTheProductProps) => {
  return (
       <Button className="w-[50px] h-[40px] bg-yellow-400">
        <Link to={`${routes.products}/${product.id}`} className="w-full block text-center">
        <SquareArrowOutUpRight />
        </Link>
      </Button>
  );
};
