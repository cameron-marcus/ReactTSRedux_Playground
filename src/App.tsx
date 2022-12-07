import React from 'react';
import ScrollAnimation from './features/scrollAnimation/ScrollAnimation';
import NavBar from './features/navigation/NavBar';
import HomePage from './features/homePage/HomePage';
import Login from './features/login/Login';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectUserIsSet } from './features/login/loginSlice';
import Quiz from './features/quiz/Quiz';

function App() {
  const userIsSet = useAppSelector(selectUserIsSet);

  if (userIsSet) {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scrollEffect" element={<ScrollAnimation />} />
          <Route path="/quiz/general" element={<Quiz catagory='9' name="general knowledge"/>} />
          <Route path="/quiz/art" element={<Quiz catagory='25' name="art"/>} />
          <Route path="/quiz/sports" element={<Quiz catagory='21' name="sports"/>} />
          <Route path="/quiz/politics" element={<Quiz catagory='24' name="politics"/>} />
        </Routes>
      </>
    );
  } 
  else {
    return (
      <Login />
    );
  }
}

export default App;
