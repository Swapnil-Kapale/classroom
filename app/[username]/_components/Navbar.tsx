import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';


interface NavbarProps {
    username: string;
}

const Navbar = (params:NavbarProps) => {

    
  return (
    <div className='bg-[#B5CB99] h-16 flex justify-between px-20 py-4'>
        
        <p>Eclassroom</p>

        <div className='flex gap-4'>
            
            <p className=''>
                {params.username}
            </p>

            <Avatar>
                <AvatarImage src="http://192.168.0.104:8000/media/avatars/temp_avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    </div>
  )
}

export default Navbar