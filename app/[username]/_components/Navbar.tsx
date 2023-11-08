'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';



interface NavbarProps {
    username: string;
    logo : string;
}


const Navbar = (params:NavbarProps) => {
  return (
    <div className='bg-[#B5CB99] h-16 flex justify-between items-center px-20 '>
        
        <a
            onClick={() => window.history.back()}
            className='text-lg border border-gray-950 bg-transparent rounded-full px-3  h-10 text-center flex items-center cursor-pointer'
        >
            <FaArrowLeft/>
        </a>
        <Link href={`/${params.username}`} className='text-2xl'>
            Eclassroom
        </Link>

        <div className='flex gap-4'>

            <p className=''>
                {params.username}
            </p>

            <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    </div>
  )
}

export default Navbar