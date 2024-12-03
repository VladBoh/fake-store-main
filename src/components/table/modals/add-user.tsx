import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { withMask } from 'use-mask-input'
import { type infer as zodInfer } from 'zod'

import { userAddSchema } from '../config/shemas'

import { useAddUserMutation } from '@/api/users/users'
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
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'

type AddFormValues = zodInfer<typeof userAddSchema>

export const AddUserModal = () => {
    const form = useForm<AddFormValues>({
        resolver: zodResolver(userAddSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            name: {
                firstname: '',
                lastname: ''
            },
            address: {
                geolocation: {
                    lat: '-37.3159',
                    long: '81.1496'
                },
                city: '',
                street: '',
                number: '',
                zipcode: ''
            }
        }
    })

    const [open, setOpen] = useState(false)

    const [addUser, { isLoading }] = useAddUserMutation()

    const handleUserDelete = async (data: AddFormValues) => {
        try {
            await addUser({
                ...data,
                address: {
                    ...data.address,
                    number: +data.address.number
                }
            })
                .unwrap()
                .then(() => {
                    toast.success(`User added successfully`)
                    setOpen(false)
                })
        } catch (err: any) {
            toast.error(err.data.message ? err.data.message : 'Something went wrong')
        }
    }

    const onSubmit = (formData: AddFormValues) => {
        handleUserDelete(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-36'>
                    <UserRound className='mr-2 size-4' />
                    Add user
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='nickname@gmail.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='John223'
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
                                name='name.firstname'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Last Name</FormLabel>
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
                                name='name.lastname'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Doe'
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
                            name='password'
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-y-2'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordWithReveal {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-y-2'>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl ref={withMask('+380 99 999 99 99')}>
                                        <Input
                                            {...field}
                                            type='tel'
                                            inputMode='tel'
                                            placeholder='+38 065 1234 5588'
                                            className='pr-10'
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 grid-rows-2 gap-4 border-t pt-2'>
                            <FormField
                                control={form.control}
                                name='address.city'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Kyiv'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='address.street'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address Street</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Shevchenko, 45B'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='address.zipcode'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address Zipcode</FormLabel>
                                        <FormControl>
                                            <Input
                                                min={1}
                                                inputMode='numeric'
                                                type='number'
                                                placeholder='79000'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='address.number'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                min={1}
                                                inputMode='numeric'
                                                type='number'
                                                placeholder='444'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-x-4'>
                            <Button
                                disabled={isLoading}
                                type='submit'
                                className='w-28'>
                                {isLoading ? <Loader2 className='size-4' /> : 'Add user'}
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
