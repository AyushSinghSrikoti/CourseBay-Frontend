import { useEffect, useState } from 'react' 
import axios from 'axios'
import Home from './components/home'
import Courses from './components/courses'
import GetStarted from './components/getStarted'
import Creator from './components/creator'
import Profile from './components/profile'
import Error from './components/error/error'
import Compare from './components/compare'
import DiscussionThread from './components/discussionThread'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  } from "react-router-dom";
  

function App() {
  // const [name , setName] = useState("");

  // useEffect(()=>{
  //   axios.get('/api/ayush')
  //   .then((res)=>{
  //     setName(res.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // },[])

  const routes = createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/become-a-creator" element={<Creator />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/error" element={<Error/>}/>
      <Route path="/compare" element={<Compare/>}/>
      <Route path="/course/:courseId/discussion" element={<DiscussionThread />} />
    </>
  )

  const router = createBrowserRouter(routes);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
