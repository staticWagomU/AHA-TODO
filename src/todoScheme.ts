import { z } from "astro:content";

export default z.object({
  id: z.number(),
  title: z.string(),
  complete: z.boolean(),
});
