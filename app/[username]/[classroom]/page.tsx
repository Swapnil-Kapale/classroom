'use client'
import React, { useEffect, useReducer, useState } from 'react'
import Navbar from '../_components/Navbar';
import Cookies from 'js-cookie';



interface classroomProps {
  params: {
    classroom_id: string;
    classroom: string;
    username: string;
  };
}

interface Assignment {
  assignment_id: number;
  assignment_name: string;
  due_date: string;
}

const classroom = ({ params }:classroomProps) => {

  const [username, setusername] = useState(params.username);
  const [assignments, setassignments] = useState<Assignment[]>([]);
  const [role, setrole] = useState(Cookies.get('role'));

  const getassignments = async () => {
    
   
   console.log(params.classroom);
 
    
    const token = Cookies.get('access');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+params.classroom+'/assignments/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
    });

    const response = await classroomsResponse.json();
    setassignments(response.data);

  }

  useEffect(() => {
    getassignments();
  }, []);

  return (
    <div className='bg-slate-100'>
      <Navbar username={username} logo =""/>
      <div className="flex justify-end items-center mt-7 px-10  bg-slate-100">
        {role === 'teacher' ? (
                <a
                  href={`/${params.username}/${params.classroom}/createAssignment`}
                  className="text-lg border border-gray-950 bg-slate-50 rounded-full px-3 py-1 h-10 text-center flex items-center"
                >
                  + Create Assignment
                </a>)
                : 
                ("")
        }
      </div>
      <div className='bg-slate-100 w-screen h-screen'>
        {/* check for assignments if not show proper msg else list of assignments with name and due date */}
        {!assignments ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-3xl text-gray-950">No assignments found</h1>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl text-gray-950 mt-10">Assignments</h1>
            <div className="flex flex-col justify-center items-center">


              {assignments.map((assignment) => (
                  <a href={`/${params.username}/${params.classroom}/${role}/${assignment.assignment_id}`}>
                  <div className="flex items-center bg-slate-50 rounded-xl mt-5 w-[1000px] p-5 border border-black h-24">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <h1 className="text-2xl text-gray-950 p-5">{assignment.assignment_name}</h1>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xl text-gray-950">
                          {assignment.due_date}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}

            </div>
          </div>
        )}

      </div>
      
    </div>
  )
}

export default classroom