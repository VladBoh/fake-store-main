import { useGetProductsQuery } from "@/api/products/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SkeletonLoading } from "../skeleton";
import { RemoveProductModal } from "./modals/delete-products";
import { BasketProduct } from "./modals/basket-product";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { AboutTheProduct } from "./modals/product-button";

export const CardsPage = () => {
  const { data, isLoading } = useGetProductsQuery({
    limit: 30,
  });

  if (isLoading) {
    return <SkeletonLoading />;
  }

  const trunc = (text: string | undefined, maxLength: number): string =>
    text && text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text || "";

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((product) => (
        <Card className="bg-amber-950 h-[310px] flex flex-col justify-between" key={product.id}>
          <CardHeader className="text-amber-600">
            <CardTitle className="text-lg font-bold">{trunc(product.title, 60)}</CardTitle>
            <CardDescription className="text-[#e39254] text-sm line-clamp-3">
              {trunc(product.description, 150)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-red-600 text-base">
            <p>Price: ${product.price}</p>
          </CardContent>
          <CardFooter className="text-blue-600 text-sm">
            <p>
              <span className="text-amber-500 font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </CardFooter>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-yellow-500">Options</Button>
            </PopoverTrigger>
            <PopoverContent className="bg-amber-950 flex border-amber-400 gap-2 p-2 w-full">
              <AboutTheProduct product={product} />
              <BasketProduct product={product} />
              <RemoveProductModal product={product} />
            </PopoverContent>
          </Popover>
        </Card>
      ))}
    </div>
  );
};
