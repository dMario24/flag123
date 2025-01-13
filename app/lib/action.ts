'use server';

import { ActionClientFactory } from "./factory/action/action-client-factory";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const actionClient = ActionClientFactory.getClient();

export async function saveLikeDeltasToDatabase(
  insertData: { flag_id: number; delta_cnt: number }[],
  clientId: string
): Promise<void> {
  actionClient.saveLikeDeltasToDatabase(insertData, clientId);
}

export async function updateFlag(
  id: number,
  formData: FormData,
): Promise<void> {
  actionClient.updateFlag(id, formData);

  const path = `/flags/${id}/detail`;
  revalidatePath(path);
  redirect(path);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

