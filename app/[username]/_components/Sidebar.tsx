'use client'
import React from 'react'

interface Classroom {
    classroom_name: string;
    teacher_name: string;
    classroom_id : number;
}

interface SidebarProps {
    classroomlist: Classroom[];
    username: string;
}


const Sidebar = (params:SidebarProps) => {
  return (
    <div className='bg-gray-200 h-screen w-2/12 border border-gray-500 rounded-lg p-4 flex flex-col '>
        {params.classroomlist.map((classroom, index) => (
              <a href={`/${params.username}/${classroom.classroom_name}?classroom_id=${classroom.classroom_id}`}
              className='bg-white h-8 text-center text-lg '>{classroom.classroom_name}</a>
        ))}
    </div>
  )
}

export default Sidebar