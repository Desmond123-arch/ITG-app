import {z} from 'zod'

export const editAccountSettingSchema = z.object({
    email: z.string().email().min(1, 'Email is required'),
    oldPassword: z.string().min(1, 'Email is required'),
    newPassword: z.string().min(1, 'Email is required'),
    confirmPassword: z.string().min(1, 'Email is required')
})