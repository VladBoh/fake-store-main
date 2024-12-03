import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/api/products/product";
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from "../ui/card";
import { BasketProduct } from "./modals/basket-product";

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading, isError } = useGetSingleProductQuery(Number(id));

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold text-red-700">loading...</div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold text-red-600">Error.</div>
            </div>
        );
    }

    return (
        <div className="p-6 mx-auto max-w-5xl">
            <Card className="bg-amber-950 text-yellow-50 shadow-2xl rounded-lg overflow-hidden flex flex-col lg:flex-row">
                <CardContent className="w-full lg:w-1/2 shadow-md flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto object-cover"
                    />
                </CardContent>
                <div className="p-6 w-full lg:w-2/3">
                    <CardHeader className="text-3xl font-bold mb-4">{product.title}</CardHeader>
                    <CardDescription className="text-lg mb-4 ml-6">{product.description}</CardDescription>
                    <CardContent className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-green-600">${product.price}</span>
                        <span className="text-sm text-gray-500">Category: {product.category}</span>
                    </CardContent>
                    <CardFooter>
                        <BasketProduct product={product} />
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};
