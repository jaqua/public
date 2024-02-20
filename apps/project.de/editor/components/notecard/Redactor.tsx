/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        H. Nadir
 * @author        A. Naseem
 */
import { useCallback, useEffect, useState } from 'react'

import { Editor } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Box from '@mui/material/Box'

import { RefIdMark } from '@jaqua/project.de/util/notecard'

import CustomModal from './CustomModal'
import EditorMenu from './toolbar/Editor'

const empty =
  '{"type":"doc","content":[{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph"}]}]}]}'

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
      HTMLAttributes: {
        class: 'group'
      }
    },
    listItem: {
      HTMLAttributes: {
        class: 'item'
      }
    }
  }),
  RefIdMark,
  Image
]

interface BaseEditorProps {
  content?: string
  setJson: any
}
const BaseEditor: React.FC<BaseEditorProps> = ({ content = '', setJson }) => {
  const [openImageModal, setOpenImageModal] = useState(false)
  const [openRefModal, setOpenRefModal] = useState(false)

  const turnOnBulletListMode = useCallback((editor: Editor) => {
    if (editor && !editor.isActive('bulletList'))
      editor.chain().toggleBulletList().run()
  }, [])

  const editorOnUpdateHandler = useCallback(
    (editor: Editor) => {
      const json = editor.getJSON()
      setJson(json)
      turnOnBulletListMode(editor)
    },
    [setJson, turnOnBulletListMode]
  )

  const editor = useEditor({
    autofocus: 'start',
    onCreate: ({ editor }) => {
      editor.commands.focus('end')
      turnOnBulletListMode(editor)
      editorOnUpdateHandler(editor)
    },
    onUpdate: ({ editor }) => {
      editorOnUpdateHandler(editor)
    },
    extensions,
    content: JSON.parse(content || empty)
  })

  const addImageAtCurrentPosition = (imageSrc: string) => {
    if (editor && editor.commands.insertContent) {
      editor.commands.insertContent({
        type: 'image',
        attrs: {
          src: imageSrc,
          alt: '' // Optional: Provide alternative text for the image
        }
      })
    }
  }

  const handleImageModalSubmit = (value: string) => {
    addImageAtCurrentPosition(value)
    setOpenImageModal(false)
  }

  const getExistingRefIdsFromSelection = () => {
    if (!editor) {
      console.log('Editor not initialized')
      return []
    }

    const { state } = editor.view
    const { from, to } = state.selection
    let existingRefIds = []

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (!node.marks) return
      node.marks.forEach((mark) => {
        if (mark.type.name === 'refId') {
          existingRefIds = [
            ...new Set([...existingRefIds, ...mark.attrs.refIds])
          ]
        }
      })
    })
    return existingRefIds
  }

  const handleRefModalSubmit = (values: string[]) => {
    setOpenRefModal(false)
    const refIdsArray = values.map(String)

    if (!editor) {
      console.log('Editor not initialized')
      return
    }

    // Ensure the mark exists and then apply it
    if (editor.can().setMark('refId'))
      editor.chain().focus().setMark('refId', { refIds: refIdsArray }).run()
    else console.log('refId mark not found')
  }

  useEffect(() => {
    if (editor) setJson(editor.getJSON())
  }, [editor, setJson])

  if (!editor) return null

  const onKeyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === 'Tab') {
      if (!editor.isActive('bulletList')) turnOnBulletListMode(editor)
      evt.preventDefault()
      return
    }

    if (evt.code === 'Backspace') {
      const { selection } = editor.state
      if (selection && selection.empty) {
        const { parentOffset, parent, pos } = selection.$anchor
        const { nodeSize, content } = parent
        const diff = nodeSize - content.size
        if (parentOffset <= 0) {
          const from = pos - diff
          const to = pos
          editor.commands.deleteRange({ from, to })
          evt.preventDefault()
        }
      }
      return
    }

    if (evt.code === 'Delete') {
      const { selection } = editor.state
      if (selection && selection.empty) {
        const { parentOffset, parent, pos } = selection.$anchor
        const { nodeSize, content } = parent
        const diff = nodeSize - content.size
        if (parentOffset >= content.size) {
          const from = pos
          const to = from + diff
          editor.commands.deleteRange({ from, to })
          evt.preventDefault()
          return false
        }
      }
    }
  }

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        backgroundColor: (theme) => theme.palette.background.paper
      }}
      onKeyDown={onKeyDownHandler}
    >
      <CustomModal
        title="Image"
        open={openImageModal}
        handleClose={() => setOpenImageModal(false)}
        handleSubmitSingleInput={handleImageModalSubmit}
        handleSubmitMultipleInputs={(values: string[]) => {
          return
        }}
      />
      <CustomModal
        title="Reference"
        open={openRefModal}
        handleClose={() => setOpenRefModal(false)}
        handleSubmitSingleInput={(value: string) => {
          return
        }}
        handleSubmitMultipleInputs={handleRefModalSubmit}
        multipleInputs={true}
        data={getExistingRefIdsFromSelection()}
      />
      <EditorMenu
        editor={editor}
        setOpenImageModal={setOpenImageModal}
        setOpenRefModal={setOpenRefModal}
      />

      <Box
        component={EditorContent}
        sx={{
          flex: 1,
          '& .group': {
            padding: 0,
            pl: (theme) => theme.spacing(2),
            listStyleType: 'none'
          },
          '& .item': {
            paddingLeft: (t) => t.spacing(2),
            listStyle: 'none'
          },
          '& p': {
            margin: 0
          },
          '& :focus': {
            outline: 'none'
          },
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
        }}
        editor={editor}
        className="editor_textarea"
      />
    </Box>
  )
}

export default BaseEditor
