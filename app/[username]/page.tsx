'use client'

import { FC, useEffect, useState } from "react";
import Navbar from "./_components/Navbar";
import ClassCard from "./_components/ClassCard";
import Link from 'next/link';

interface pageProps {
  params: {
    username: string;
  };
}
interface Classroom {
  coursename: string;
  teachername: string;
}

const Page: FC<pageProps> = ({ params }) => {
  const [username, setusername] = useState(params.username);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [dataStatus, setDataStatus] = useState(true); // Assume data status is true initially

  const getclassroom = async () => {
    const classroomsResponse = await fetch('http://192.168.0.105:3000/classroom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username })
    });

    const data = await classroomsResponse.json();
    setClassrooms(data.classrooms);
    setDataStatus(data.status); // Set the data status

  }

  useEffect(() => {
    getclassroom();
  }, []);

  return (
    <div>
      <Navbar username={username} />
      
      {dataStatus ? (
        <div className='flex flex-wrap gap-10'>
          {classrooms.map((classroom, index) => (
            <ClassCard key={index} classroom={classroom.coursename} teacher={classroom.teachername} username={username}/>
          ))}
        </div>
      ) : (
        <p>No classrooms to display</p>
      )}
    </div>
  );
};

export default Page;

