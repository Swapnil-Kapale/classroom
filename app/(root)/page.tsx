'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Cookies from 'js-cookie';





const Home = () => {
  
  // const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function authenticate (event: React.MouseEvent<HTMLInputElement, MouseEvent>): Promise<void> {
    
      console.log(process.env.API_BASE_URL)

    const auth = await fetch("http://localhost:8000/api/users/login/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ username: username, password: password })
    });

    const authResponse = await auth.json();
    //print response body
    const accessToken = authResponse.data.tokens.access;
    const role = authResponse.data.role;
    //save in cookie
    Cookies.set('access', accessToken);
    Cookies.set('role', role);

    if (authResponse.success) {
      router.push(`/${username}`);
    } else {
      const authStatus = document.getElementById('authStatus');
      if (authStatus) {
        authStatus.innerHTML = 'Incorrect username or password';
      }
    }
  }

  return (
    <div className='h-screen bg-[#2C3333] flex'>
      <div className='h-screen w-1/2 flex flex-col gap-20 justify-center items-center pt-10'>
        <h1 className='text-5xl font-bold text-center text-[#CBE4DE]'>
          Welcome to Your Virtual Classroom Learn, Connect, Succeed
        </h1>
        <p className='text-2xl text-center text-[#CBE4DE]'>
          Welcome to the classroom, your online space for limitless learning. Join us in exploring a world of knowledge, connecting with peers, and discovering new horizons. Get ready to learn, grow, and excel.
        </p>
        <Image
          src='/hero_classroom.svg' // Use / instead of \
          alt='hero'
          width={500}
          height={500}
        />
      </div>
      <div className=' flex flex-col justify-center items-center  bg-[#CBE4DE] w-1/2'>
        
        <div className='bg-white h-[520px] w-[450px] rounded-[40px]'>
          <form action="" className='flex flex-col items-center gap-12 py-10'>
            <h1 className='text-[30px]'>Sign in</h1>
            <input
              type="text"
              placeholder="Username or Email" 
              className='w-64 p-4 border-2 border-black h-10'
              value={username} 
              onChange={(e)=>{ setUsername(e.target.value); }}
            />
            <input 
              type="password"
              placeholder="Password" 
              className='w-64 p-4 border-2 border-black h-10'
              value={password}
              onChange={(e)=>{ setPassword(e.target.value); }} 
            />
            <input 
              type="button" 
              value="Sign In" 
              className='text-center w-64 text-lg bg-[#2E4F4F] text-white p-2 rounded-lg' 
              onClick={authenticate}
            />
            <p className='text-[#2E4F4F]'>Forgot Password?</p>
            <p id='authStatus' className=' text-[#2E4F4F]'></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
