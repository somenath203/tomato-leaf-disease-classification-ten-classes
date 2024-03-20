/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from 'react-router-dom';
import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';

const About = () => {
    
  const navigate = useNavigate();

  const redirectToFeedbackPage = () => {

    navigate('/feedback-page');

  };

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <ProtectedRouteNavbar />

          <div className="flex items-center justify-center flex-col gap-12">
            <p className="text-xl lg:text-2xl font-bold text-indigo-500 tracking-wide mt-4">
              ABOUT THE PROJECT
            </p>

            <div className="flex justify-center items-center flex-col gap-7">
              <p className="text-lg text-center px-7 lg:px-14 font-semibold text-indigo-600 tracking-wide mt-1">
                Our project, Tomato Leaf Disease Prediction, is a web
                application that uses Convolutional Neural Network (CNN) and
                TensorFlow to detect and classify various types of tomato leaf
                diseases from images. Our application also uses the MERN stack
                (MongoDB, Express, React, and Node.js) to create a user-friendly
                interface for accepting real-time input from farmers and
                displaying the results. Additionally, we use FastAPI to connect
                our CNN model with the frontend and provide a fast and reliable
                service. Our goal is to provide a simple and accessible tool for
                farmers to monitor their tomato plants and take preventive
                measures before the diseases spread and damage their crops. We
                hope that our project will help farmers save time, money, and
                resources, and ultimately increase their productivity and
                income. We are always open to feedback and suggestions on how to
                improve our project and make it more useful for our users. Thank
                you for visiting our website and supporting our project. If you
                have any questions or feedback, please feel free to contact us
                by clicking the button below
              </p>

              <button className="border-4 py-4 px-8 border-indigo-500 text-base font-semibold tracking-widest rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 uppercase transition-all duration-100" onClick={redirectToFeedbackPage}>
                Give Feedback
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
