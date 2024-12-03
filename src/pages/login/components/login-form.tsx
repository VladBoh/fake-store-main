'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useLoginMutation } from '@/api/auth/auth'
import { Button } from '@/components/ui/button'
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
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required'
        })
        .min(3, 'Username should be at least 3 characters'),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(1, 'Password is required')
        // .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        // .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        )
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = React.useState('')

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async (formData: LoginFormData) => {
        try {
            await login(formData)
                .unwrap()
                .then((response) => {
                    navigate(routes.home)
                    localStorage.setItem('token', response.token)
                })
        } catch (error: any) {
            setErrorMessage(error.data || 'Something went wrong')
        }
    }

    const onSubmit = (formData: LoginFormData) => {
        handleLogin(formData)
    }

    return (
        <div
            className={cn('grid gap-6', className)}
            {...props}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='grid gap-3'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='shadcn'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordWithReveal {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={isLoading}>
                        {isLoading && <Loader2 className='mr-2 size-4 animate-spin' />}
                        Sign In with Email
                    </Button>
                </form>
            </Form>
            {errorMessage ? (
                <div className='rounded-md bg-destructive-foreground p-2 text-sm text-destructive'>
                    {errorMessage}
                </div>
            ) : null}
        </div>
    )
}
