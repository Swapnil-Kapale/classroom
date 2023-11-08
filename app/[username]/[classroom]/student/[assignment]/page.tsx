'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';

interface studentassignmentpageProps {
  params: {
    username: string;
    classroom: string;
    assignment: string;
  };

}

interface Assignment {
  assigned_date: string;
  assignment_id: number;
  assignment_name: string;
  description: string;
  due_date: string;
  score: number;
}

const studentassignmentpage = ({params}:studentassignmentpageProps) => {
  
  const [assignment, setassignment] = useState<Assignment>();
  const [file, setfile] = useState<File>();
  const [assignment_status, setassignment_status] = useState<string>("Not Submitted");

  const getassignments = async () => {
            

    const token = Cookies.get('access');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+params.classroom+'/assignments/'+params.assignment, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
    });

    const response = await classroomsResponse.json();
    console.log(response.data);
    setassignment(response.data);                
  }

  const getsubmission = async () => {
            

    const token = Cookies.get('access');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+params.classroom+'/assignments/'+params.assignment+'/submissions/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
    });

    const response = await classroomsResponse.json();
    console.log(response.data);
    if(response.data.length > 0){
      setassignment_status(response.data[0].status);
    }
    else{
      setassignment_status("Not Submitted");
    }             
  }

  useEffect(() => {
    getassignments();
    getsubmission();
  }, []);


  const submitAssign = async () => {
    const token = Cookies.get('access');
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('status', 'submitted');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+params.classroom+'/assignments/'+params.assignment+'/submissions/create/', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' },
      body: formData
    
    });

    const response = await classroomsResponse.json();
    console.log(response.data);
    setassignment(response.data);
  }
  const submitdraft = async () => {
    const token = Cookies.get('access');
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('status', 'draft');
    const classroomsResponse = await fetch('http://localhost:8000/api/classrooms/'+params.classroom+'/assignments/'+params.assignment+'/submissions/create/', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' },
      body: formData
    });

    const response = await classroomsResponse.json();
    console.log(response.data);
    setassignment(response.data);
  }

  return (
    <div className='bg-slate-100 h-screen flex items-center justify-center'> 
      <div className='bg-white h-[1000px] w-[1600px] shadow-2xl p-10'> 
        
        <div className='flex border border-slate-800 rounded-xl'>
            <div className='w-2/3 flex flex-col gap-10   h-[900px] p-10 '>
                <a
                  onClick={() => window.history.back()}
                  className='text-lg border border-gray-950 bg-slate-50 rounded-full px-3 py-1 h-10 text-center flex items-center w-16 cursor-pointer'
                >
                  Back
                </a>
                <div className='flex'>
                <h1 className='text-4xl text-gray-950'>{assignment?.assignment_name}</h1>
                </div>
                <div className='flex  items-center'>
                <h1 className='text-2xl text-gray-950'>{assignment?.due_date}</h1>
                </div>
                <div className='flex  items-center'>
                <h1 className='text-2xl text-gray-950 text-justify'>{assignment?.description}</h1>
                </div>
                <div className='flex  items-center'>
                <h1 className='text-2xl text-gray-950'>{assignment?.score}</h1>
                </div>

            </div>
            <div className='bg-[#c5daaa] w-1/3 flex flex-col items-center justify-center gap-16 border-l-4 border-dashed border-gray-500 '>

                <div className='text-[30px]'> Submission Area</div>
                
                <div className="border-4 border-dashed border-gray-400 flex items-center justify-center w-5/6">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                               Assignment File
                            </p>
                          </div>
                          <input 
                                id="dropzone-file" 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => setfile(e.target.files?.[0])}
                          />
                        </label>
                </div>

                <button className='text-lg border border-gray-950 bg-slate-50 rounded-xl px-3 py-1 h-10 flex items-center w-5/6 justify-center text-center' onClick={submitdraft}>
                  Save Draft
                </button>

                <button className='bg-[#93ac72] text-lg border border-gray-950 rounded-xl px-3 py-1 h-10 flex items-center w-5/6 justify-center text-center' onClick={submitAssign}>
                  {assignment_status}
                </button>

                <h1 className=''>{assignment_status}</h1>

            </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default studentassignmentpage