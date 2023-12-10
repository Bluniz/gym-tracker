import * as z from 'zod';
import {numberRegex} from '../../utils/regex';

export const schema = z.object({
  name: z.string(),
  series: z
    .string()
    .min(1)
    .max(3)
    .transform(e => (e === '' ? undefined : e))
    .refine(value => (value ? numberRegex.test(value) : true), {
      message: 'Series must be numbers',
    })
    .optional(),

  reps: z
    .string()
    .max(3)
    .transform(e => (e === '' ? undefined : e))
    .refine(value => (value ? numberRegex.test(value) : true), {
      message: 'Reps must be numbers',
    })
    .optional(),
  weight: z
    .string()
    .max(3)
    .transform(e => (e === '' ? undefined : e))
    .refine(value => (value ? numberRegex.test(value) : true), {
      message: 'Weight must be numbers',
    })
    .optional(),
  last_weight: z
    .string()
    .max(3)
    .transform(e => (e === '' ? undefined : e))
    .refine(value => (value ? numberRegex.test(value) : true), {
      message: 'Last Weight must be numbers',
    })
    .optional(),
});

export type Schema = z.infer<typeof schema>;
