import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';
import * as z from 'zod';

/**
 * Validasi parameter pencarian pengguna
 */
export const searchParamsCache = createSearchParamsCache({
  name: parseAsString.withDefault(''),
  email: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  roles: parseAsArrayOf(z.string()).withDefault([]),
});

/**
 * Validasi skema pembuatan pengguna baru
 */
export const createUserSchema = z.object({
  username: z.string().min(3, 'Username harus memiliki minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  roles: z.array(z.string()).optional(),
  status: z.enum(['enabled', 'disabled']).default('enabled'),
});

/**
 * Validasi skema pembaruan pengguna
 */
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username harus memiliki minimal 3 karakter')
    .optional(),
  email: z.string().email('Email tidak valid').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
  roles: z.array(z.string()).optional(),
  status: z.enum(['enabled', 'disabled']).optional(),
});

/**
 * Tipe data berdasarkan schema
 */
export type GetUsersSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
