import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface ClassCardProps {
    classroom: string;
    teacher: string;
    username: string;
}

const ClassCard = (params:ClassCardProps) => {
  return (
        
    <a href={`/${params.username}/${params.classroom}`} className="m-10 w-[350px] flex flex-col items-center bg-white border border-gray-200  shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-[20px]">
        <Image
            src='/card_img.jpeg'
            alt='hero'
            width={200}
            height={200}
            className='rounded-[20px]'
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{params.classroom}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{params.teacher}</p>
        </div>
    </a>
    

  )
}

export default ClassCard