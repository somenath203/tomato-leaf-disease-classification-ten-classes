/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import { toast } from 'react-toastify';

import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';
import Loader from '../components/Loader';

const UploadImage = () => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: async (acceptedImage) => {
      try {

        const formData = new FormData();

        formData.append('fileUploadedByUser', acceptedImage[0]);

        setLoading(true);
        

        const leafOrNotLeaf = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_FASTAPI_LEAF_OR_NOT_LEAF}/predict`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (leafOrNotLeaf?.data?.predicted_result === 'not leaf') {
         
          toast.error(
            'The uploaded image does not appear to be that of a tomato leaf. Please upload a tomato leaf image for prediction.',
            {
              position: 'top-center',
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'light',
            }
          );

          setLoading(false);

          return;

        }


        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_FASTAPI}/predict`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        formData.append('predictedResult', data?.predicted_result);
        formData.append('confidence', data?.confidence);

        await axios.post(
          `${process.env.REACT_APP_BACKEND_API_NODEJS}/create-pred-result`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'leaf-proj-token'
              )}`,
            },
          }
        );

        setLoading(false);

        toast.success(
          'your prediction has been made successfully and stored in the database',
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          }
        );

        MySwal.fire({
          html: `
            <img src="${URL.createObjectURL(
              acceptedImage[0]
            )}" style="width: 100%;" alt="leaf image" />
            <p style="font-size: 27px; margin-top: 10px;">Predicted Result of the uploaded image: <b>${
              data?.predicted_result
            }</b></p>
            <p style="font-size: 27px; margin-top: 10px;">Confidence with which the prediction was made: <b>${
              data?.confidence
            }</b></p>
          `,
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
    },
    onDropRejected: () => {
      setLoading(false);

      alert('Multiple photos are not allowed');
    },
  });

  return (
    <>
      {loading && <Loader />}

      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <ProtectedRouteNavbar />

          <section className="flex justify-center">
            <div
              className={`flex items-center justify-center flex-col border-2 border-dashed px-14 lg:px-20 py-28 w-11/12 lg:w-8/12 rounded-2xl mt-4 lg:mt-2 hover:cursor-pointer  ${
                isDragActive ? 'bg-gray-100' : 'bg-gray-50'
              } ${isDragActive ? 'border-indigo-700' : 'border-indigo-500'}`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              <p className="text-5xl lg:text-7xl text-indigo-600 mb-4">
                <i className="fa-solid fa-folder-open"></i>
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-center">
                Drag and Drop
              </p>
              <p className="text-xl lg:text-2xl font-semibold text-center">
                or{' '}
                <span className="text-indigo-500 text-center">
                  browse image
                </span>{' '}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
