/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';
import Loader from '../components/Loader';

const FeedbackPage = () => {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [feedback, setFeedback] = useState('');

  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState();

  const getAuhenticatedUserData = async () => {
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

      setLoading(false);

      setFullName(data?.data?.fullname);

      setEmailAddress(data?.data?.email);
    } catch (error) {
      setLoading(false);

      console.log(error);

      toast.error(
        'Something went wrong while autofilling user data in feedback form!! Please try again!',
        {
          position: 'top-center',
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        }
      );
    }
  };

  useEffect(() => {
    getAuhenticatedUserData();
  }, []);

  const submitUserFeedback = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_API_NODEJS}/create-feedback`,
        { fullName: fullName, emailAddress: emailAddress, feedback: feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('leaf-proj-token')}`,
          },
        }
      );

      setLoading(false);

      toast.success('your feedback has been submitted successfully', {
        position: 'top-center',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      MySwal.fire({
        title: 'Thank you for your Feedback',
        text: 'Thank you for using our product and sharing your valuable feedback. We value your support and your input. Your response has been successfully saved.',
        icon: 'success',
      });

      setFeedback('');
    } catch (error) {
      setLoading(false);

      console.log(error);

      toast.error('Something went wrong!! Please try again!', {
        position: 'top-center',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setFeedback('');
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="bg-white pb-6 sm:pb-8 lg:pb-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <ProtectedRouteNavbar />

          <div className="flex items-center justify-center flex-col gap-6">
            <p className="text-2xl lg:text-3xl font-bold text-indigo-500 tracking-wider mt-4">
              FEEDBACK FORM
            </p>

            <div className="w-11/12 lg:w-9/12">
              <form
                className="flex flex-col gap-4"
                onSubmit={submitUserFeedback}
              >
                <div className="w-full flex flex-col gap-1">
                  <p className="font-semibold text-indigo-600 tracking-wide text-lg">
                    Full Name
                  </p>
                  <input
                    type="text"
                    className="border-2 border-indigo-600 w-full p-2 rounded-xl"
                    placeholder="enter your fullname"
                    defaultValue={fullName}
                    disabled
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <p className="font-semibold text-indigo-600 tracking-wide text-lg">
                    Email ID
                  </p>
                  <input
                    type="email"
                    className="border-2 border-indigo-600 w-full p-2 rounded-xl"
                    placeholder="enter your email-id"
                    defaultValue={emailAddress}
                    disabled
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <p className="font-semibold text-indigo-600 tracking-wide text-lg">
                    Feedback
                  </p>
                  <textarea
                    cols="30"
                    rows="10"
                    className="border-2 border-indigo-600 w-full p-2 rounded-xl resize-none"
                    placeholder="enter your question, feedback or query"
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                </div>

                <button className="w-full mb-2 mt-1 border-2 py-4 px-8 border-indigo-500 text-base font-semibold tracking-widest rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 uppercase transition-all duration-100">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
