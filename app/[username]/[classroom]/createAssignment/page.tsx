'use client'

import React from 'react'
import Navbar from '../../_components/Navbar'
import { useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface createAssignmentProps {
  
  params: {
    username: string;
    classroom: string;
  }
}


const createAssignment = ({params}:createAssignmentProps) => {

  const [classroomid, setclassroomid] = useState(params.classroom)
  const [assignmentname, setassignmentname] = useState('')
  const [description, setdescription] = useState('')
  const [duedate, setduedate] = useState('')
  const [score, setscore] = useState('')
  const [assignment_staus, setassignment_staus] = useState('')

  const router = useRouter();

  const craeteAssign = async () => {

    const d:any = new Date(duedate);
    const formated_date:any = d.toISOString().split('T')[0];
    console.log(formated_date,assignmentname,description,score,assignment_staus);

    const token = Cookies.get('access');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+classroomid+'/assignments/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        assignment_name: assignmentname,
        description: description,
        due_date: formated_date,
        score: score,
        status: assignment_staus
      })
    });
    const response = await classroomsResponse.json();
    console.log(response);
    router.push(`/${params.username}/${params.classroom}/`);
  }


  return (
    <div>
      <Navbar username={""} logo='Classroom' />
      
      <div className='flex justify-center pt-36 h-screen bg-slate-100'>
        <div className='bg-white w-1/3 h-[600px] rounded-2xl shadow-xl'>
          <div className='flex flex-col justify-center items-center h-full gap-10'>
            <p className='text-3xl font-bold'>Create Assignment</p>
            <div className='flex flex-col justify-center items-center gap-4'>
              <input 
                type="text" 
                placeholder='Enter Assignment Name' 
                className='border border-gray-300 rounded-lg px-4 py-2 w-64'
                value={assignmentname}
                onChange={(e) => setassignmentname(e.target.value)}
              />
              <textarea
                name="description" 
                id="description" 
                placeholder='Description' 
                className='border border-gray-300 rounded-lg px-4 py-2 w-64 h-36'
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>
              <input 
                type="date" 
                placeholder='Enter Due Date' 
                className='border border-gray-300 rounded-lg px-4 py-2 w-64'
                value={duedate}
                onChange={(e) => setduedate(e.target.value)}
              />
              <input 
                type="text" 
                placeholder='Score'  
                className='border border-gray-300 rounded-lg px-4 py-2 w-64'
                value={score}
                onChange={(e) => setscore(e.target.value)}
              />
              <select 
                value={assignment_staus} 
                onChange= {(e)=> setassignment_staus(e.target.value)}
                className='border border-gray-300 rounded-lg px-4 py-2 w-64'
              >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
              </select>
              <button className='bg-[#B5CB99] text-black rounded-lg px-4 py-2 w-64' onClick={craeteAssign} >Create Assignment</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default createAssignment