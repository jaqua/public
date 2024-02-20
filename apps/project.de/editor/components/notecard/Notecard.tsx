/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        H. Nadir
 * @author        A. Naseem
 */
import { useCallback, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { JSONContent } from '@tiptap/react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import {
  Notecard,
  NotecardAddInput,
  NotecardContentDocument,
  NotecardUpdateInput,
  useNotecardAddMutation,
  useNotecardUpdateMutation
} from '@jaqua/project.de/graphql'
import { converter, getReferences } from '@jaqua/project.de/util/notecard'

import ContentBox from './ContentBox'
import Form from './Form'
import Raw from './Raw'
import MainToolbar from './toolbar/Main'

export const useFormattedListFromEditor = () => {
  const [json, setJson] = useState<JSONContent | null>(null)
  const formattedNestedList = useMemo(() => {
    if (!json) return null
    const formattedJson = Array.isArray(json.content) && json.content[0]
    return converter(formattedJson)
  }, [json])

  const returnObj = useMemo(
    () => ({ json, setJson, formattedNestedList }),
    [formattedNestedList, json]
  )
  return returnObj
}

type Props = {
  data?: Notecard
}
export const Editor = ({ data }: Props) => {
  const [showContentBox, setShowContentBox] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  const { formattedNestedList, json, setJson } = useFormattedListFromEditor()

  const [add] = useNotecardAddMutation()
  const [update] = useNotecardUpdateMutation({
    refetchQueries: [
      {
        query: NotecardContentDocument,
        variables: { param: { name: 'id', value: data?.id } }
      }
    ]
  })

  const onToggleSplit = useCallback(() => {
    setShowContentBox((p) => !p)
  }, [])

  const { reset, handleSubmit, control, formState } = useForm({
    defaultValues: {
      title: data?.title || '',
      intro: data?.intro || '',
      content: data?.content || '',
      synonyms: data?.synonyms || [],
      category: data?.category || []
    }
  })
  const content = useWatch({
    control,
    name: ['title', 'intro']
  })

  const submitForm = async (values) => {
    const id = data?.id
    const refIds = [...getReferences(json.content)]

    const content = JSON.stringify(json, null, 2)

    if (!(content && values.title)) return // @todo: synthetic event
    setSaving(true)

    if (id) {
      const input: NotecardUpdateInput = {
        id,
        ...values,
        content,
        refIds
      }

      try {
        await update({ variables: { input } })
        setTimeout(() => setSaving(false), 2000)
      } catch (error) {
        console.error(error)
        setSaving(false)
      }
    } else {
      const input: NotecardAddInput = {
        ...values,
        content,
        refIds,
        type: 'doctor'
      }

      try {
        await add({ variables: { input } })
        setTimeout(() => setSaving(false), 2000)
        // @todo: add id -> update + link to list
        reset()
        // @todo: reset editor
        // @todo: redirect to list
      } catch (error) {
        console.error(error)
        setSaving(false)
      }
    }
  }

  return (
    <Box>
      <Container
        maxWidth={'desktop'}
        sx={{
          display: 'flex',
          gap: (theme) => theme.spacing(2)
        }}
      >
        <Paper elevation={0} sx={{ flex: 1, p: (t) => t.spacing(2) }}>
          <form onSubmit={handleSubmit(submitForm)}>
            <MainToolbar
              formState={formState}
              isSaving={saving}
              submitForm={submitForm}
              onToggleSplit={onToggleSplit}
            />
            <Form control={control} setJson={setJson} content={data?.content} />
          </form>
        </Paper>
        <ContentBox
          showContentBox={showContentBox}
          content={content}
          formattedNestedList={formattedNestedList}
        />
      </Container>
      <Raw formattedNestedList={formattedNestedList} />
    </Box>
  )
}

export default Editor
