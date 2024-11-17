// app/actions/server-actions.ts
'use server'

import { getUserProgress } from "@/db/queries";
import type { UserProgressType } from "@/db/queries";

export async function fetchUserProgress(): Promise<UserProgressType | null> {
  return await getUserProgress();
}