'use client';
import React, { FC, useState } from 'react';
import Navbar from '../_components/Navbar';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface joinClassProps {
  params: {
    username: string;
  }
}

const joinClass : FC<joinClassProps>= ({params}) => {
  const [code, setcode] = useState("")
  const router = useRouter();

  const joinclass = async () => {
    console.log(code);
    const token = Cookies.get('access');;
    const joinclassResponse = await fetch('http://localhost:8000/api/classrooms/enroll/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        classroom_code: code
      })
    });

    const response = await joinclassResponse.json();
    console.log(response);
    router.push(`/${params.username}/`);
  }

  return (
    <div>
      <Navbar username={params.username} logo='Classroom' />
      <div className='flex justify-center h-screen bg-slate-100 pt-36'>
        <div className='bg-white w-1/3 h-1/2 rounded-2xl shadow-xl'>
          <div className='flex flex-col justify-center items-center h-full gap-10'>
            <p className='text-3xl font-bold'>Join Class</p>
            <div className='flex flex-col justify-center items-center gap-4'>
              <input 
                  type="text" 
                  placeholder='Enter Class Code' 
                  className='border border-gray-300 rounded-lg px-4 py-2 w-48' 
                  value={code}
                  onChange={(e)=>{ setcode(e.target.value); }}
              />
                <button className='bg-[#B5CB99] rounded-lg px-4 py-2 mt-10' onClick={joinclass}>Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default joinClass