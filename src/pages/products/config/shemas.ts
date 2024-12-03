import { z } from 'zod'

export const productAddSchema = z.object({
    title: z.string().min(4, { message: 'Title must be at least 4 characters.' }),
    price: z.coerce.number().min(1, { message: 'Price must be at least 1 dollar.' }),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters.' })
        .max(100, { message: 'Description must be at most 100 characters.' }),
    image: z.string().url({ message: 'Image must be a valid URL.' }),
    category: z.string().min(1, { message: 'Category is required.' })
})
