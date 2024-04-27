import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  'use server'
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log(user)


  const signOut = async () => {
  'use server'

  const supabase = createClient()
  await supabase.auth.signOut()

  // Clear the IndexedDB NotesDB
  const request = indexedDB.deleteDatabase('NotesDB');
  request.onerror = function(event) {
    // Handle errors.
    console.error("Error deleting database.", event);
  };
  request.onsuccess = function(event) {
    // Database deleted successfully
    console.log("Database deleted successfully");
  };

  return redirect('/')
}


  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signOut}>
        <button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href='/login'
      className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
    >
      Login
    </Link>
  )
}
