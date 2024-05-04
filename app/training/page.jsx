import { createClient } from '@/utils/supabase/server'
import TrainingWrapper from '@/components/training/TrainingWrapper.jsx'
import { redirect } from 'next/navigation'
import {
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  title: 'Training 3.0',
  description: 'The best way to stay on top of your game.',
}

export default async function Training() {
  const queryClient = new QueryClient()
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect(`/login?redirect=training`)
  }

  const { data: training } = await supabase.from('training').select()
  const { data: userData, error } = await supabase.from('users').select()



  supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'training' },
      payload => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()

  return (
    <>
      <>
        <title>Training</title>
      </>

        <TrainingWrapper userData={userData} />


    </>
  )
}
