import { z } from 'zod'

const addressSchema = z.object({
    geolocation: z.object({
        lat: z.string(),
        long: z.string()
    }),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    zipcode: z.string()
})

const nameSchema = z.object({
    firstname: z
        .string({
            required_error: 'Firstname is required.'
        })
        .min(2, {
            message: 'Firstname must be at least 2 characters.'
        }),
    lastname: z
        .string({
            required_error: 'Lastname is required.'
        })
        .min(2, {
            message: 'Lastname must be at least 2 characters.'
        })
})

export const userAddSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required.'
        })
        .min(4, {
            message: 'Username must be at least 4 characters.'
        }),
    phone: z
        .string({
            required_error: 'Phone is required.'
        })
        .min(10, {
            message: 'Phone must be at least 10 characters.'
        }),
    email: z
        .string({
            required_error: 'Email is required.'
        })
        .email({
            message: 'Email is invalid.'
        })
        .min(1, {
            message: 'Email is required.'
        }),
    password: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        ),
    name: nameSchema,
    address: addressSchema
})
