import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { Product } from '@/api/products/products.types';
import { useDeleteProductMutation } from '@/api/products/product';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';

interface RemoveProductModalProps {
    product: Product;
}

export const RemoveProductModal = ({ product }: RemoveProductModalProps) => {
    const [open, setOpen] = useState(false);
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const handleProductDelete = useCallback(async () => {
        try {
            await deleteProduct(product.id).unwrap();
            toast.success(`Product "${product.title}" deleted successfully`);
            setOpen(false); 
        } catch (err: any) {
            console.error(err);
            toast.error(err.data?.message || 'Something went wrong');
        }
    }, [product.id, product.title]);
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-[50px] h-[40px] bg-yellow-400" size="sm">
                    <X className="h-3.5 w-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                    Are you sure you want to delete a
                        <span className="font-bold text-primary"> {product.title}</span>? 
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-end gap-x-4">
                    <Button
                        className="w-28"
                        onClick={handleProductDelete}
                        variant="destructive"
                    >
                        {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Delete product'}
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
