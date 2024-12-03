import { AddProductModal } from "@/components/products/modals/add-product";
import { CardsPage } from "@/components/products/products-card";
import { ProductsTable } from "@/components/products/products-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export const ProductsPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Products
                </h1>
                <AddProductModal/>
              </div>
            <Tabs defaultValue="cards">
                <TabsList className="flex justify-center gap-4 mb-5">
                    <TabsTrigger value="cards" className="px-4 py-2 text-sm font-medium bg-yellow-400 text-amber-950 rounded-md">
                        Cards
                    </TabsTrigger>
                    <TabsTrigger value="table" className="px-4 py-2 text-sm font-medium bg-yellow-400 text-amber-950 rounded-md">
                        Table
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="cards">
                    <CardsPage />
                </TabsContent>
                <TabsContent value="table">
                    <ProductsTable />
                </TabsContent>
            </Tabs>
        </div>
    );
};
