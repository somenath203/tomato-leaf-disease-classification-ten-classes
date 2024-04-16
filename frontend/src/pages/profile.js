/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from 'react';
import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loader from './../components/Loader';


const HistoryPage = () => {
  const [userFullName, setUserFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [userProfilePic, setUserProfilePic] = useState('');

  const [loading, setLoading] = useState();

  const getProfileInfo = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_NODEJS}/get-user-profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('leaf-proj-token')}`,
          },
        }
      );

      setUserFullName(data?.data?.fullname);
      setEmailAddress(data?.data?.email);
      setUserProfilePic(data?.data?.profilePic);

      setLoading(false);

      toast.success('your profile has been fetched successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <ProtectedRouteNavbar />

          <div className="flex items-center justify-center flex-col gap-16">
            <p className="text-2xl lg:text-3xl font-bold text-indigo-500 tracking-wide mt-4">
              PROFILE
            </p>

            <div className="flex flex-col items-center justify-center gap-9 mx-auto">
              <img
                src={userProfilePic}
                alt="user profile pic"
                className="w-32 lg:h-40 h-32 lg:w-40 rounded-full shadow-xl"
              />

              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-lg lg:text-2xl tracking-wide font-semibold flex flex-col lg:flex-row gap-3 text-center">
                  <span className='text-center'>Full Name:{' '}</span>
                  <span className="text-indigo-600 text-center">{userFullName}</span>
                </p>

                <p className="text-lg lg:text-2xl tracking-wide font-semibold flex flex-col lg:flex-row gap-3 text-center">
                  <span className='text-center'>Email Address:{' '}</span>
                  <span className="text-indigo-600 text-center">{emailAddress}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
