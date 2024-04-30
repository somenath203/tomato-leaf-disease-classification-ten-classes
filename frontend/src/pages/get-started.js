/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import axios from 'axios';

import Loader from '../components/Loader';
import LeafImage from './../assets/tomato_leaf.png';
import { toast } from 'react-toastify';

const GetStarted = () => {
  const [loading, setLoading] = useState();
  const { openSignIn, openSignUp } = useClerk();

  const { isLoaded, isSignedIn, user } = useUser();

  const navigate = useNavigate();

  const signInClerk = () => {
    openSignIn();
  };

  const signUpClerk = () => {
    openSignUp();
  };

  const signInSignUpUserToBackend = async () => {
    try {
      if (user) {
        const fullName = user?.firstName + ' ' + user?.lastName;

        const email = user?.emailAddresses[0]?.emailAddress;

        const profilePic = user?.imageUrl;

        setLoading(true);

        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_NODEJS}/sign-in-sign-up`,
          {
            fullname: fullName,
            emailAddress: email,
            profilePic: profilePic,
          }
        );

        localStorage.setItem('leaf-proj-token', data?.data?.token);

        setLoading(false);

        navigate('/upload-image-and-pred');
      }
    } catch (error) {
      setLoading(false);

      console.log(error);

      toast.error('Something went wrong!! Please try again!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      signInSignUpUserToBackend();
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <>
      {loading && <Loader />}

      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex flex-col lg:flex-row items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold text-black lg:text-3xl tracking-wider"
              aria-label="logo"
            >
              <i className="fa-solid fa-leaf text-indigo-500 text-3xl lg:text-5xl"></i>
              HEALTHY TOMATO
            </a>

            <nav className="mt-4 lg:mt-0 lg:flex items-center gap-5">
              <NavLink
                className="text-base lg:text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 mr-3 lg:mr-0"
                onClick={signInClerk}
              >
                SIGN IN
              </NavLink>
            </nav>
          </header>

          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-center text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
                An AI Tool
              </p>

              <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
                Predict disease in tomato leaf
              </h1>

              <div className="block lg:hidden overflow-hidden rounded-lg bg-gray-100 shadow-lg w-full m-auto mt-4 mb-6">
                <img
                  src={LeafImage}
                  loading="lazy"
                  alt="tomato leaf photo"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 text-lg md:text-2xl lg:text-lg">
                This is an AI tool that helps you detect the disease that your
                tomato plant is having based on the picture of the leaf using
                state of the art deep learning models.
              </p>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  className="inline-block rounded-lg tracking-widest bg-indigo-500 px-8 py-4 md:py-5 lg:py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base md:w-full lg:w-56"
                  onClick={signUpClerk}
                >
                  GET STARTED
                </button>
              </div>
            </div>

            <div className="hidden lg:block overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-5/6 xl:w-5/12">
              <img
                src={LeafImage}
                loading="lazy"
                alt="tomato leaf photo"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
