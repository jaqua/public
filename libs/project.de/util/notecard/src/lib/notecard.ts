/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        H. Nadir
 * @author        A. Naseem
 */
import { Mark, mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import { JSONContent, generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export type TProcessedNodeObj = {
  title: string
  imageId: string
  refIds: string[]
  table: any
  context: 'default' | 'info' | 'cave'
  description: string
  items: TProcessedNodeObj[]
  type: 'group' | 'item' | "image" | "table"

}

type Node = {
  type: string
  content: Node[]
  attrs: any
}
const regex = /^&gt;[^\s].*/
const regexDescriptionDelimiter = /^&gt;/
const allowedContextValues = ['default', 'info', 'cave'] as const

export const getReferences = (arr: any, out = new Set()) => {
  if (Array.isArray(arr)) {
    arr.forEach((r) => getReferences(r, out))
  } else if (arr && typeof arr === 'object') {
    for (const key in arr) {
      if (key === 'refIds' && Array.isArray(arr[key])) {
        arr[key].forEach((r: any) => out.add(r))
      } else getReferences(arr[key], out)
    }
  }
  return out
}

export const RefIdMark = Mark.create({
  name: 'refId',

  // Add attributes to your mark
  addAttributes() {
    return {
      refIds: {
        default: [],
        // Parse from HTML to read the attribute as an array
        parseHTML: (element) => {
          const refIds = element.getAttribute('data-ref-ids')
          return refIds ? refIds.split(',').map(String) : []
        }, // Render back to HTML with the attribute
        renderHTML: (attributes) => {
          return { 'data-ref-ids': attributes['refIds'].join(',') }
        }
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-ref-ids]'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  }
})

const genHtml = (json: JSONContent) =>
  json
    ? generateHTML(json, [
      StarterKit.configure({
        bulletList: {
          keepAttributes: true,
          keepMarks: true
        }
      }),
      RefIdMark,
      Image
    ])
    : ''

function formatBulletList(node: Node, arr: any[] = []) {
  if (node.type === 'bulletList') {
    for (const item of node.content) {
      const obj: TProcessedNodeObj = {
        title: '',
        imageId: '',
        refIds: [],
        table: [],
        description: '',
        context: 'info',
        items: [],
        type: 'item'
      }
      const v = formatListItem(item, obj, arr)
      // if (v?.title)
      arr.push(v)
    }
    return arr
  }
  return null
}

function descriptionToNormalText(description: string) {
  return regex.test(description)
    ? description.replace(regexDescriptionDelimiter, '')
    : description
}

function formatListItem(
  node: Node,
  obj: TProcessedNodeObj = {
    title: '',
    imageId: '',
    refIds: [],
    table: [],
    description: '',
    context: 'default',
    items: [],
    type: 'item'
  },
  arr: any[]
) {
  try {
    if (node.type === 'listItem' || node.type === 'table') {
      let isDescriptionNode = false
      let returnValue = obj
      for (const item of node.content) {
        if (item.type === 'bulletList') {
          const arr = formatBulletList({ ...item }, [])
          const v = arr?.map((itm) => {
            return itm
          })

          if (returnValue.type === 'item') {
            returnValue.type = 'group'
            returnValue.description = ''
          }

          returnValue.items = v ? v : []
        } else if (item.type === 'image') {
          // returnValue.title = 'Image'
          returnValue.imageId = item?.attrs?.src
          returnValue.title = "Image"
        } else if (item.type === 'table') {
          returnValue.title = "Table"
          returnValue.table = item.content
        } else {

          if (!item.content) continue
          const content = genHtml(item).trim()
          const matched = regex.test(content)

          if (matched) {
            returnValue = arr[arr.length - 1] ? arr[arr.length - 1] : obj
            returnValue.description = [
              returnValue.description,
              descriptionToNormalText(content)
            ]
              .filter(Boolean)
              .join('\n')
            if (arr[arr.length - 1]) {
              isDescriptionNode = true
            } else {
              isDescriptionNode = false
            }
          } else {
            const contentSepareted = content.split('|')
            const titleWithContext = contentSepareted[0].trim()
            const matchedContext = allowedContextValues.find((cxt) =>
              titleWithContext.startsWith(`${cxt}:`)
            )
            if (matchedContext) {
              obj.context = matchedContext
              obj.title = titleWithContext.replace(`${matchedContext}:`, '')
            } else {
              obj.title = titleWithContext
            }
          }

        }
      }
      return isDescriptionNode ? null : returnValue
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

export const converter = (obj: any) => {
  if (!obj) return
  const temp = formatBulletList(obj, [])
  return temp
}
