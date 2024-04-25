/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useClerk } from '@clerk/clerk-react';

const ProtectedRouteNavbar = () => {
  const { signOut } = useClerk();

  const [userProfilePic, setUserProfilePic] = useState('');

  const navigate = useNavigate();

  const getProfileInfo = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_NODEJS}/get-user-profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('leaf-proj-token')}`,
          },
        }
      );

      setUserProfilePic(data?.data?.profilePic);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const logoutUser = () => {
    signOut().then(() => {
      localStorage.removeItem('leaf-proj-token');
      navigate('/');
    });

    toast.success('you have logged out successfully', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  };

  return (
    <>
      <header className="mb-8 flex flex-col lg:flex-row items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
        <a
          href="#"
          className="inline-flex items-center gap-2.5 text-lg font-bold text-black lg:text-3xl tracking-wideR"
          aria-label="logo"
        >
          <i className="fa-solid fa-leaf text-indigo-500 text-3xl lg:text-5xl"></i>
          HEALTHY TOMATO
        </a>

        <div className="flex gap-4 items-center justify-center mt-3 lg:mt-0">
          <NavLink to="/resources">
            <a className="text-base tracking-wide lg:text-xl font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 mr-3 lg:mr-0">
              RESOURCES
            </a>
          </NavLink>

          <NavLink to="/upload-image-and-pred">
            <a className="text-base tracking-wide lg:text-xl font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 mr-3 lg:mr-0">
              PREDICT
            </a>
          </NavLink>

          <NavLink to="/history-page">
            <a className="text-base tracking-wide lg:text-xl font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 mr-3 lg:mr-0">
              HISTORY
            </a>
          </NavLink>
        </div>

        <div className="flex gap-5 items-center justify-center mt-3 lg:mt-0">
          <NavLink to="/about-us">
            <a className="text-base tracking-wide lg:text-xl font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">
              ABOUT
            </a>
          </NavLink>

          <NavLink to="/profile">
            <img
              src={userProfilePic}
              alt="user profile pic"
              className="h-10 w-10 rounded-full shadow-lg"
            />
          </NavLink>
          <i
            className="fa-solid fa-right-from-bracket cursor-pointer text-xl tracking-wide lg:text-2xl font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 mr-3 lg:mr-0"
            onClick={() => logoutUser()}
          ></i>
        </div>
      </header>
    </>
  );
};

export default ProtectedRouteNavbar;
