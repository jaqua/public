import { useSession } from 'next-auth/react'

type Props = {
  formattedNestedList: any[]
}
const Raw = ({ formattedNestedList }: Props) => {
  const { data: session }: any = useSession()
  if (session?.user?.roles.indexOf('admin') === -1) return null

  return (
    <pre>
      <code>{JSON.stringify(formattedNestedList, null, 2)}</code>
    </pre>
  )
}

export default Raw
