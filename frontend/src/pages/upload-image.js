/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './../components_shadcn_ui/ui/alert-dialog';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './../components_shadcn_ui/ui/table';

import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';
import Loader from '../components/Loader';

const UploadImage = () => {

  const [loading, setLoading] = useState();

  const [leafImage, setLeafImage] = useState(null);

  const [openResultTableModal, setOpenResultTableModal] = useState(false);
  const [openResultAnalysisModal, setOpenResultAnalysisModal] = useState(false);
  const [openAboutAndCureOfTheDisease, setOpenAboutAndCureOfTheDisease] = useState(false);

  const [allResults, setAllResults] = useState(false);
  const [modelsThatMadeCommonPrediction, setModelsThatMadeCommonPrediction] = useState([]);
  const [finalPrediction, setFinalPrediction] = useState('');
  const [finalConfidence, setFinalConfidence] = useState();
  const [aboutTheDisease, setAboutTheDisease] = useState();
  const [cureOfTheDisease, setCureOfTheDisease] = useState();

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

        setLeafImage(acceptedImage[0]);
        setAllResults(data?.prediction_results_of_all_model);
        setModelsThatMadeCommonPrediction(data?.final_predicted_result_of_the_leaf?.models_that_made_the_common_prediction_along_with_their_confidence);
        setFinalPrediction(data?.final_predicted_result_of_the_leaf?.predicted_result_returned_by_most_of_the_models);
        setFinalConfidence(data?.final_predicted_result_of_the_leaf?.maximum_confidence_among_the_common_disease_predicted_by_the_models);
        setAboutTheDisease(data?.final_predicted_result_of_the_leaf?.about_the_final_predicted_disease);
        setCureOfTheDisease(data?.final_predicted_result_of_the_leaf?.cure_of_the_final_predicted_disease);

        formData.append('predictedResult', data?.final_predicted_result_of_the_leaf?.predicted_result_returned_by_most_of_the_models);
        formData.append('confidence', data?.final_predicted_result_of_the_leaf?.maximum_confidence_among_the_common_disease_predicted_by_the_models);

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

        setOpenResultTableModal(true);

        toast.success(
          'your prediction has been made successfully and stored in the database',
          {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          }
        );
      } catch (error) {
        setLoading(false);

        setOpenResultTableModal(false);

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

  const results = allResults;

  const columns = [
    {
      accessorKey: 'name_of_the_model',
      header: 'Model Name',
    },
    {
      accessorKey: 'predicted_result',
      header: 'Predicted Result',
    },
    {
      accessorKey: 'confidence',
      header: 'Confidence',
    },
  ];

  const table = useReactTable({
    data: results,
    columns,
    getCoreRowModel: getCoreRowModel(),
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

      <AlertDialog open={openResultTableModal} onOpenChange={setOpenResultTableModal}>
        <AlertDialogContent className="overflow-auto max-h-[90vh]">
          <AlertDialogHeader>
            <span className="m-auto">
              <AlertDialogTitle>Predicted Results</AlertDialogTitle>
            </span>
            <AlertDialogDescription>
              {leafImage && (
                <img
                  src={URL.createObjectURL(leafImage)}
                  alt="uploaded leaf"
                  className="m-auto mt-10 rounded-lg"
                />
              )}
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className='text-white bg-indigo-600 hover:bg-indigo-800' onClick={() => setOpenResultAnalysisModal(true)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openResultAnalysisModal} onOpenChange={setOpenResultAnalysisModal}>
        <AlertDialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden ">
          <AlertDialogHeader>
            <span className="m-auto">
              <AlertDialogTitle>Result Analysis</AlertDialogTitle>
            </span>
            <AlertDialogDescription>
              <div className="flex flex-col gap-4 text-center text-xl">
                <div>
                  <p>
                    Based on the table, the models that made the common
                    prediction are:{' '}
                  </p>
                  {modelsThatMadeCommonPrediction.map((m) => (
                    <span className="flex items-center justify-center gap-2 font-bold">
                      {m}
                    </span>
                  ))}
                </div>
                <div>
                  <p>
                    After analyzing all the predictions, it can be concluded
                    that the final predicted disease of the tomato leaf is{' '}
                    <span className="font-bold">{finalPrediction}</span> with a
                    final confidence of{' '}
                    <span className="font-bold">{finalConfidence}</span>
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className='text-indigo-600 bg-white hover:bg-white border-2 border-indigo-600 hover:border-indigo-800 mt-2 md:mt-0' onClick={() => setOpenResultTableModal(true)}>Previous</AlertDialogAction>
            <AlertDialogAction className='text-white bg-indigo-600 hover:bg-indigo-800' onClick={() => setOpenAboutAndCureOfTheDisease(true)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openAboutAndCureOfTheDisease} onOpenChange={setOpenAboutAndCureOfTheDisease}>
        <AlertDialogContent className="overflow-y-auto overflow-x-hidden max-h-[90vh]">
          <AlertDialogHeader>
            <span className="m-auto">
              <AlertDialogTitle>Disease Analysis</AlertDialogTitle>
            </span>
            <AlertDialogDescription>
              <div className="flex flex-col gap-4 text-xl">
                <div>
                  <p className="flex flex-col items-center justify-center text-center">
                    <span className="font-bold">
                      About {finalPrediction}:
                    </span>{' '}
                    <span>{aboutTheDisease}</span>
                  </p>
                </div>
                <div>
                  <p className="flex flex-col items-center justify-center text-center">
                    <span className="font-bold">
                      Possible Cure of {finalPrediction}:
                    </span>{' '}
                    <span>{cureOfTheDisease}</span>
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className='text-indigo-600 bg-white hover:bg-white border-2 border-indigo-600 hover:border-indigo-800 mt-2 md:mt-0' onClick={() => setOpenResultAnalysisModal(true)}>Previous</AlertDialogAction>
            <AlertDialogAction className='text-white bg-indigo-600 hover:bg-indigo-800'>Finish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UploadImage;
