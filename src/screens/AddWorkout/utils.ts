import * as z from 'zod';


export const schema = z.object({
  title: z.string(),
  exercises: z.array(z.string()).optional()
})

export type Schema = z.infer<typeof schema>;
