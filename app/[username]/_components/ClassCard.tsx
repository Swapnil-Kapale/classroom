import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface ClassCardProps {
    classroom: string;
    teacher: string;
    username: string;
    classroom_id: string;
    classroom_code: string;
    student_count: number;
}

const ClassCard = (params:ClassCardProps) => {
    const [role, setrole] = useState(Cookies.get('role'));
  return (
    <div className='h-5'>
        <a href={`/${params.username}/${params.classroom_id}`} className="m-10 w-[500px] flex flex-col items-center bg-white border border-gray-200  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-[20px] overflow-hidden">
            <Image
                src='/card_img.jpeg'
                alt='hero'
                width={200}
                height={200}
                />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{params.classroom}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{params.teacher}</p>
                {role === 'teacher' ? (
                    <div>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Code: {params.classroom_code}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{params.student_count} students</p>

                    </div>
                ) : ("")}
            </div>
        </a>
    </div>    
    
  )
}

export default ClassCard