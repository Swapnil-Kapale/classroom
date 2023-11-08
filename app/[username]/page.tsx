'use client'

import { FC, useEffect, useState } from "react";
import Navbar from "./_components/Navbar";
import ClassCard from "./_components/ClassCard";
import Link from 'next/link';
import Cookies from 'js-cookie';
import Sidebar from "./_components/Sidebar";

interface pageProps {
  params: {
    username: string;
  };
}
interface Classroom {
  classroom_name: string;
  teacher_name: string;
  classroom_id : string;
  classroom_code: string;
  description: string;
  student_count: number;
}

const Page: FC<pageProps> = ({ params }) => {
  const [username, setusername] = useState(params.username);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [dataStatus, setDataStatus] = useState(true); // Assume data status is true initially
  const [role, setRole] = useState(Cookies.get('role'));
 

  const getclassroom = async () => {
    
    const token = Cookies.get('access');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
    });

    const response = await classroomsResponse.json();
    console.log(response);
    setClassrooms(response.data);
    setDataStatus(response.success); // Set the data status

  }

  useEffect(() => {
    getclassroom();
  }, []);


  return (
    <div className=" bg-slate-100">

      <Navbar username={username} logo="Eclassroom"/>

      <div className="flex justify-end items-center mt-7 px-10  bg-slate-100">
          {role === 'teacher' ? (
              <a
                href={`${params.username}/createClass`}
                className="text-lg border border-gray-950 bg-slate-50 rounded-full px-3 py-1 h-10 text-center flex items-center"
              >
                + Create Class
              </a>)
              : 
              (<a
                href={`${params.username}/joinClass`}
                className="text-lg border border-gray-950 bg-slate-50 rounded-full px-3 py-1 h-10 text-center flex items-center"
              >
                + Join Class
              </a>)
            }
      </div>
      <div className=" bg-slate-100 h-screen">


        {dataStatus ? (
          <div className='flex flex-wrap gap-y-52'>
            {classrooms.map((classroom, index) => (
              <ClassCard key={index} classroom_id = {classroom.classroom_id} classroom={classroom.classroom_name} teacher={classroom.teacher_name} username={username} classroom_code={classroom.classroom_code} student_count = {classroom.student_count}/>
              ))}
          </div>
        ) : (
          <p className="text-[50px]  absolute top-1/2 left-[35%]">No classrooms to display</p>
          )}
  

      </div>
    </div>
  );
};

export default Page;

