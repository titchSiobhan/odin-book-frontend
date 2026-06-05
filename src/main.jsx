import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router'
import { UserProvider } from './context/userContext';

import HomePage from './homePage'
import Login from './login'
import NavBar from './nav';
import Profile from './profile';
import SignUp from './signUp';
import CreatePost from './createPost';
import AddComment from './addComment';
import FriendsList from './friendsList';
import Search from './search';
import UsersProfiles from './usersProfiles';

const router = createBrowserRouter([
 { path: '/',
  element: <HomePage />},
      {path: '/login',
      element: <Login />},
      {path: '/profile',
      element: <Profile />},
      {path: '/signUp',
      element: <SignUp />},
      
      {path: '/friendsList',
      element: <FriendsList />},
      {path: '/search',
      element: <Search />},
      {path: '/user/profile/:userId',
      element: <UsersProfiles />},

])
createRoot(document.getElementById('root')).render(
  
   <UserProvider>
     <RouterProvider router={router} />
   </UserProvider>
  
)