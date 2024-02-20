/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 */
import { JSONContent } from '@tiptap/react'

import Stack from '@mui/material/Stack'

import { ChipsInput, TextField } from '@jaqua/shared/feat/form'

import Editor from './Redactor'

type Props = {
  content?: string
  control: any
  setJson: (json: JSONContent) => void
}
const Form = ({ content = '', control, setJson }: Props) => {
  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        name="title"
        label="Titel"
        control={control}
        autoFocus
        rules={{ required: true }}
      />
      <ChipsInput
        name="synonyms"
        label="Synonyme"
        control={control}
        sx={{ width: 100 + '%' }}
      />
      <ChipsInput
        name="category"
        label="Kategorien"
        control={control}
        sx={{ width: 100 + '%' }}
      />
      <TextField
        type="text"
        name="intro"
        label="Einleitung"
        control={control}
        autoFocus
        multiline
        rules={{ required: false }}
        minRows={2}
      />

      <Editor setJson={setJson} content={content} />
    </Stack>
  )
}

export default Form
