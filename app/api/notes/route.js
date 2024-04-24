import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient();

// #### GET ALL NOTES ####
export const GET = async req => {
  try {
    const { data: notes, error } = await supabase.from('notes').select();
    if (error) throw error;
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Couldn't get notes. Look at /@services/api/notesApi.js.  ERROR:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// #### DELETE SELECTED NOTE ####
export const DELETE = async req => {
  if (req.method !== 'DELETE') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
  try {
    const { id } = await req.json();
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ message: 'DELETE request received', deletedData: id });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// #### TOGGLES NOTE COMPLETION AND MORE ####
export const PATCH = async req => {
  try {
    const { id, type, title, updateStatus } = await req.json();
    switch (type) {
      case 'toggleCompletion':
        const { error } = await supabase.from('notes').update({ completed: updateStatus }).eq('id', id);
        if (error) throw error;
        return NextResponse.json({ message: 'Completion toggled' });
      // Include other cases with similar structure...
      default:
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

//#### CREATES NEW NOTE ####
export const POST = async req => {
  try {
    const { id, title, completed } = await req.json();
    const { data, error } = await supabase.from('notes').insert([{ id, title, completed }]);
    if (error) throw error;
    return NextResponse.json({ message: 'POST request received', title, completed });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};



// import { createClient } from '@/utils/supabase/server'
// import { NextRequest, NextResponse } from 'next/server'

// // #### GET ALL NOTES ####
// export const GET = async req => {
//   const supabase = createClient()
//   const { data: notes, error } = await supabase.from('notes').select()
//   if (error) {
//     "Couldn't get notes. Look at /@services/api/notesApi.js.  ERROR:", error
//   }
//   // console.log('server api: ', notes)
//   return NextResponse.json(notes)
// }

// export async function deleteNote(id) {
//   const { error } = await supabase.from('notes').delete().eq('id', id)
//   if (error) {
//     throw error
//   }
// }

// // #### DELETE SELECTED NOTE ####
// export const DELETE = async (req, res) => {
//   if (req.method !== 'DELETE') {
//     return res.status(405).json({ error: 'Method Not Allowed' })
//   }
//   const { id } = await req.json()

//   const supabase = createClient()

//   const { data, error } = await supabase.from('notes').delete().eq('id', id)

//   return NextResponse.json({
//     message: 'DELETE request received',
//     deletedData: id,
//   })
// }

// // #### TOGGLES NOTE COMPLETION ####
// export const PATCH = async (req, res) => {
//   const supabase = createClient()
//   const getData = await req.json()
//   const { id, type, title, updateStatus } = getData
//   switch (type) {
//     case 'toggleCompletion':
//       const { data: status, error: statusError } = await supabase
//         .from('notes')
//         .update({ completed: updateStatus })
//         .eq('id', id)
//       if (statusError) {
//         console.log(statusError)
//         throw statusError
//       }
//       return new NextResponse(status)
//       break

//     case 'editNote':
//       const { data: edit, error: editError } = await supabase
//         .from('notes')
//         .update({ editing: true })
//         .eq('id', id)
//       if (editError) {
//         throw editError
//       }
//       return new NextResponse(edit)
//       break

//     case 'cancelEdit':
//       const { data: cancelEdit, error: cancelEditError } = await supabase
//         .from('notes')
//         .update({ editing: false })
//         .eq('id', id)
//       if (cancelEditError) {
//         throw new Error(cancelEditError)
//       }
//       return new NextResponse(cancelEdit)
//       break

//     case 'updateEdit':
//       const { data: updateEdit, error: updateEditError } = await supabase
//         .from('notes')
//         .update({ title: title, editing: false })
//         .eq('id', id)
//       if (updateEditError) {
//         throw updateEditError
//       }
//       return new NextResponse(updateEdit)
//       break

//     case 'default':
//       return res.status(405).json({ error: 'Method Not Allowed' })
//   }
// }
// //#### CREATES NEW NOTE ####
// export const POST = async (req, res) => {
//   const supabase = createClient()
//   const getData = await req.json()
//   console.log('POST on API', getData)
//   const { id, title, completed, isEditing } = getData
//   const { data, error } = await supabase
//     .from('notes')
//     .insert([{ id, title, completed }])
//     .select()
//   if (error) {
//     console.error(`Something didn't work. Error: `, error)
//   }
//   return NextResponse.json({
//     message: 'POST request received',
//     title,
//     completed,
//   })
// }
