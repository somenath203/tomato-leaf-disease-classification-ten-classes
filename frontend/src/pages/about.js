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
               The project, Healthy Tomato, is a web
               application that uses Convolutional Neural Network (CNN) and
               TensorFlow to detect and classify various types of tomato leaf
               diseases from images. The application uses MERN stack
               (MongoDB, Express, React, and Node.js) for accepting tomato leaf image as input from farmers and
               displaying the disease as output in real time. Additionally, FastAPI is used to connect
               the CNN model with the frontend to provide a fast and reliable
               service. The goal is to provide a simple and accessible tool for
               farmers to monitor their tomato plants and take preventive
               measures before the diseases spread and damage their crops. The
               aim of the project is to help farmers save time, money, and
               resources, and ultimately increase their productivity and
               income. Suggestions for making this tool better are always appreciated. 
               Thank you for taking the time to explore and support the Tomato Leaf 
               Disease Prediction project. Your interest is greatly appreciated. If you
               have any questions or feedback, please feel free to give a feedback
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
