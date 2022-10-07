import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from './components';
import { EditProfile, Home, Login, Messenger, PageNotFound, Posts, Profile, Reels, SignUp, UserProfile } from './pages';
import { Protected } from './pages/Protected';

export const App = () => {
  const { login } = useSelector(state => state.register)
  return (
    <BrowserRouter>
      {login && <Navigation />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Protected element={<Home />} />} />
        <Route path="/messenger" element={<Protected element={<Messenger />} />} />
        <Route path="/profile" element={<Protected element={<Profile />} />} />
        <Route path="/editProfile" element={<Protected element={<EditProfile />} />} />
        <Route path="/posts" element={<Protected element={<Posts />} />} />
        <Route path="/reels" element={<Protected element={<Reels />} />} />
        <Route path="/profile/:id" element={<Protected element={<UserProfile />} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter >
  )
}
