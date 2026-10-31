import { z } from "zod";

export const ServicePillarSchema = z.object({
  id: z.string(),
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  metricLabel: z.string(),
  metricValue: z.string(),
});

export type ServicePillar = z.infer<typeof ServicePillarSchema>;
