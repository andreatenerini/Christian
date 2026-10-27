/** Costruisce uno stato Lexical minimale (titoli + paragrafi + elenchi) per il seed. */

type Node = Record<string, unknown>

const text = (value: string, bold = false): Node => ({
  type: 'text',
  version: 1,
  text: value,
  format: bold ? 1 : 0,
  detail: 0,
  mode: 'normal',
  style: '',
})

const base = { version: 1, direction: 'ltr', format: '', indent: 0 }

export const p = (value: string): Node => ({ ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(value)] })

export const h2 = (value: string): Node => ({ ...base, type: 'heading', tag: 'h2', children: [text(value)] })

export const ul = (items: string[]): Node => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  children: items.map((item, i) => ({ ...base, type: 'listitem', value: i + 1, children: [text(item)] })),
})

export function doc(...children: Node[]) {
  return { root: { ...base, type: 'root', children } } as never
}
