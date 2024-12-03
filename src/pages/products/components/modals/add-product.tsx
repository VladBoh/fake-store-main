import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Package } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type infer as zodInfer } from 'zod'

import { productAddSchema } from '../../config/shemas'

import { useAddProductMutation } from '@/api/products/products'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UrlInput } from '@/components/ui/url-input'

type AddFormValues = zodInfer<typeof productAddSchema>

export const AddProductModal = () => {
    const form = useForm<AddFormValues>({
        resolver: zodResolver(productAddSchema),
        defaultValues: {
            title: '',
            price: 0,
            description: '',
            image: '',
            category: ''
        }
    })

    const [open, setOpen] = useState(false)

    const [addProduct, { isLoading }] = useAddProductMutation()

    const handleProductDelete = async (data: AddFormValues) => {
        try {
            await addProduct(data)
                .unwrap()
                .then(() => {
                    toast.success(`Product added successfully`)
                    setOpen(false)
                })
        } catch (err: any) {
            toast.error(err.data.message ? err.data.message : 'Something went wrong')
        }
    }

    const onSubmit = (formData: AddFormValues) => {
        handleProductDelete(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-36'>
                    <Package className='mr-2 size-4' />
                    Add product
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add product</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Sneakers '
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='The best sneakers ever'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-start gap-x-4'>
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='John'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                inputMode='numeric'
                                                placeholder='100'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <UrlInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center justify-end gap-x-4'>
                            <Button
                                disabled={isLoading}
                                type='submit'
                                className='w-28'>
                                {isLoading ? (
                                    <Loader2 className='size-4' />
                                ) : (
                                    'Add product'
                                )}
                            </Button>
                            <Button
                                type='button'
                                onClick={() => setOpen(false)}
                                variant='secondary'>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
