import React from 'react'

interface classroomProps {
  params: {
    username: string;
    classroom: string;
  };
}

const classroom = ({ params }:classroomProps) => {
  return (
    <div>Classroom of : {params.classroom}</div>
  )
}

export default classroom