import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce(function(sum, exercise){
      return sum + exercise.exercises
    },0)
    return(
      <h5>Total of excercises: {sum}</h5>
    ) 
  }
  
  // const Part = (props) => {
  //   return (
  //     <p>
  //       {props.part.name} {props.part.exercises}
  //     </p>    
  //   )
  // }
  
  const Content = ({ course }) => {
    var names = course.parts.map(function(part){
      return (
        <p key={part.id}>
        {part.name} {part.exercises}
        </p>
      )
    })
    return (
      <div>
        {names}
      </div>
    )
  }
  const Course = (props) => {
    return (
      <div>
          <Header course={props.course}/>
          <Content course={props.course}/>
          <Total course={props.course}/>
      </div>
    )
  }

  export default Course