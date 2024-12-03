import { zodResolver } from "@hookform/resolvers/zod";
import { Package, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type infer as zodInfer } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productAddSchema } from "@/components/table/config/shemas";
import { useCreateProductMutation } from "@/api/products/product";
import { useState } from "react";

type AddFormValues = zodInfer<typeof productAddSchema>;

export const AddProductModal = () => {
  const form = useForm<AddFormValues>({
    resolver: zodResolver(productAddSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  });

  const [open, setOpen] = useState(false);

  const [addProduct, { isLoading }] = useCreateProductMutation();

  const handleProductAdd = async (data: AddFormValues) => {
    try {
      await addProduct(data)
        .unwrap()
        .then(() => {
          toast.success(`Product added successfully`);
          setOpen(false);
        });
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  const onSubmit = (formData: AddFormValues) => {
    handleProductAdd(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-36">
          <Package className="mr-2 size-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Product price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-4">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-28 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="animate-spin size-4" /> : "Add Product"}
              </Button>
              <Button type="button" onClick={() => setOpen(false)} variant="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
