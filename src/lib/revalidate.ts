import { revalidatePath } from 'next/cache'

/**
 * Invalida la cache delle pagine pubbliche dopo una modifica dal CMS.
 * Fuori dal runtime Next (es. script di seed) revalidatePath lancia: lo ignoriamo.
 */
export function revalidateSite() {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // eseguito fuori da una richiesta Next: nulla da invalidare
  }
}

export const revalidateHooks = {
  afterChange: [() => revalidateSite()],
  afterDelete: [() => revalidateSite()],
}
