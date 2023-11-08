'use client'
import React from 'react'
import { FC } from 'react'
import Navbar from '../_components/Navbar'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'


interface createClassProps {
  params: {
    username: string;
  }
}

const createClass: FC<createClassProps> = ({params}) => {

  const [classroomName, setclassroomName] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter();


  async function createClass() {

    console.log(classroomName, description)

    const token = Cookies.get('access');
    const auth = await fetch("http://localhost:8000/api/classrooms/create/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` ,'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ classroom_name: classroomName, description: description })
    });
    const authResponse = await auth.json();
    console.log(authResponse)
    router.push(`/${params.username}/${classroomName}`)
  }

  return (
    <div>
      <Navbar username={params.username} logo='Classroom' />
      <div className='flex justify-center pt-36 h-screen bg-slate-100'>
        <div className='bg-white w-1/3 h-1/2 rounded-2xl shadow-xl'>
          <div className='flex flex-col justify-center items-center h-full gap-10'>
            <p className='text-3xl font-bold'>Create Class</p>
            <div className='flex flex-col justify-center items-center gap-4'>
              <input 
                type="text" 
                placeholder='Enter Class Name' 
                className='border border-gray-300 rounded-lg px-4 py-2 w-64'
                value={classroomName}
                onChange={(e)=>{ setclassroomName(e.target.value); }}
              />
              <textarea
                name="description" 
                id="description" 
                placeholder='Description' 
                className='border border-gray-300 rounded-lg px-4 py-2 w-64 h-36'
                value={description}
                onChange={(e)=>{ setDescription(e.target.value); }}
              ></textarea>
              <button onClick={createClass} className='bg-[#B5CB99] rounded-lg px-4 py-2 mt-10'>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default createClass