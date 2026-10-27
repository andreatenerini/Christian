import type { TextField } from 'payload'

export function toSlug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Campo slug: se vuoto viene generato dal campo indicato. */
export function slugField(fromField: string): TextField {
  return {
    name: 'slug',
    type: 'text',
    label: 'Indirizzo pagina (slug)',
    unique: true,
    index: true,
    admin: { description: 'Generato automaticamente dal titolo se lasciato vuoto.' },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === 'string' && value.trim()) return toSlug(value)
          const source = data?.[fromField]
          return typeof source === 'string' ? toSlug(source) : value
        },
      ],
    },
  }
}
