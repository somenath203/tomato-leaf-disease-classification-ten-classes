/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import axios from 'axios';
import { useEffect, useState } from 'react';
import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const HistoryPage = () => {
  const [historyPred, setHistoryPred] = useState({});
  const [loading, setLoading] = useState();

  const getAllPredResult = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_NODEJS}/get-all-pred-results`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('leaf-proj-token')}`,
          },
        }
      );

      setHistoryPred(data);

      setLoading(false);

      toast.success('your whole history has been fetched successfully', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
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
    getAllPredResult();
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <ProtectedRouteNavbar />

          <section className="lg:w-11/12 mx-auto">
            <p className="text-center text-2xl lg:text-3xl font-bold tracking-wide text-indigo-500 mb-10">
              HISTORY
            </p>
            <p className="text-center text-xl lg:text-2xl font-semibold tracking-wide text-indigo-500 mb-16">
              Total Number of Predictions: {historyPred?.totalNumberOfPredictions}
            </p>

            {historyPred?.totalNumberOfPredictions === 0 ? (
              <>
                <div className="flex justify-center items-center">
                  <p className="text-3xl text-indigo-300 tracking-wider mt-8">
                    NO RECORDS FOUND
                  </p>
                </div>
              </>
            ) : (
              historyPred?.allPredictions?.map((prediction) => (
                <div
                  className="flex flex-col gap-2 p-8 rounded-xl border-2 border-indigo-600 border-solid mb-6 lg:mb-4 tracking-wide shadow-md text-semibold overflow-x-auto lg:overflow-hidden"
                  key={prediction?._id}
                >
                  <div>
                    <img
                      src={prediction?.predImageURL}
                      alt="leaf image"
                      className="w-44 rounded-md shadow-xl mb-3 border-4 border-indigo-600 m-auto lg:mx-0"
                    />
                  </div>

                  <p className="flex-col lg:flex-row">
                    <span className="text-lg lg:text-xl">
                      Prediction Result:{' '}
                    </span>
                    <span className="text-indigo-500 font-bold text-lg lg:text-xl">
                      {prediction?.predictionResult}
                    </span>{' '}
                  </p>
                  <p className="flex-col lg:flex-row">
                    <span className="text-lg lg:text-xl">
                      Confidence with which the prediction was made:{' '}
                    </span>
                    <span className="text-indigo-500 font-bold text-lg lg:text-xl">
                      {prediction?.confidenceOfThePrediction}
                    </span>{' '}
                  </p>
                  <p className="text-gray-500 flex-col lg:flex-row">
                    <span className="text-lg lg:text-xl">
                      Date of prediction:{' '}
                    </span>
                    <span className="text-lg lg:text-xl">
                      {new Date(prediction?.createdAt).getDate()}/
                      {new Date(prediction?.createdAt).getMonth() + 1}/
                      {new Date(prediction?.createdAt).getFullYear()}
                    </span>
                  </p>
                  <p className="text-gray-500 flex-col lg:flex-row">
                    <span className="text-lg lg:text-xl">
                      Time at which prediction was made:{' '}
                    </span>
                    <span className="text-lg lg:text-xl tracking-wider">
                      {new Date(prediction?.createdAt).getHours()}: 
                      {new Date(prediction?.createdAt).getMinutes() < 10 ? '0' + new Date(prediction?.createdAt).getMinutes() : new Date(prediction?.createdAt).getMinutes()}:
                      {new Date(prediction?.createdAt).getSeconds() < 10 ? '0' + new Date(prediction?.createdAt).getSeconds() : new Date(prediction?.createdAt).getSeconds()}
                    </span>
                  </p>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
