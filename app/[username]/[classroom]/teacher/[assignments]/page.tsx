'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface teacherassignmentpageProps {
  params: {
    username: string;
    classroom: string;
    assignments: string;
  };

}

interface studentaSubmissions {
  files: string[];
  student: string;
  submission_time: string;
  status: string;
}

interface student{
  student_name: string;
}


const teacherassignmentpage= ({params}: teacherassignmentpageProps) => {

  const [studentSubmissions, setstudentSubmissions] = useState<studentaSubmissions[]>([]);

  const getstudentSubmissions = async () => {
              
      const token = Cookies.get('access');
      const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+params.classroom+'/assignments/'+params.assignments+'/submissions/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
      });
  
      const response = await classroomsResponse.json();
      console.log(response.data);
      setstudentSubmissions(response.data);                
    }

  useEffect(() => {
    getstudentSubmissions();
  }
  ,[]);



  return (
    <div className='bg-slate-100 h-screen p-10'> 
      
      <div className='border rounded-lg bg-green-200 border-black h-[900px] flex flex-col p-5 items-center'>
        <h1 className='bold text-[30px]'>Assinment {params.assignments} Submission Page of classroom {params.classroom}</h1>

        <div>

          <table className='table-fixed w-full mt-5'>
            <thead>
              <tr>
                <th className='w-1/6'>Student ID</th>
                <th className='w-1/6'>Submission Date</th>
                <th className='w-1/6'>Status</th>
                <th className='w-1/6'>file</th>
              </tr>
            </thead>
            <tbody>
              {studentSubmissions.map((studentSubmission) => (
                <tr>
                  <td className='border p-1 text-center border-black'>{studentSubmission.student}</td>
                  <td className='border p-1 text-center border-black'>{studentSubmission.submission_time}</td>
                  <td className='border p-1 text-center border-black'>{studentSubmission.status}</td>
                  <td className='border p-1 text-center border-black'>
                    
                       <Link href= {studentSubmission.files[0]}>file</Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
             
        </div>

      </div>
      
    </div>
  )
}

export default teacherassignmentpage