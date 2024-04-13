import zipfile
import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from keras.models import load_model
from keras.utils import load_img, img_to_array
from io import BytesIO
from keras.applications.imagenet_utils import preprocess_input
from collections import Counter


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


zip_path_cnnfromscratch_model = 'cnnfromscratch_model.zip'
extract_dir_cnnfromscratch_model = 'cnnfromscratch_model'

zip_path_inceptionv3_model = 'inceptionV3_model.zip'
extract_dir_inceptionv3_model = 'inceptionV3_model'

zip_path_mobilenetv2_model = 'mobilenetv2_model.zip'
extract_dir_mobilenetv2_model = 'mobilenetv2_model'

zip_path_resnet50_model = 'resnet50_model.zip'
extract_dir_resnet50_model = 'resnet50_model'

zip_path_vgg19_model = 'VGG19_model.zip'
extract_dir_vgg19_model = 'VGG19_model'


def unzipModel(zip_path, extract_dir):

    if not os.path.isdir(extract_dir):

        with zipfile.ZipFile(zip_path, 'r') as zip_ref:

            zip_ref.extractall(extract_dir)


unzipModel(zip_path_cnnfromscratch_model, extract_dir_cnnfromscratch_model)
unzipModel(zip_path_inceptionv3_model, extract_dir_inceptionv3_model)
unzipModel(zip_path_mobilenetv2_model, extract_dir_mobilenetv2_model)
unzipModel(zip_path_resnet50_model, extract_dir_resnet50_model)
unzipModel(zip_path_vgg19_model, extract_dir_vgg19_model)


model_cnnfromscratch = load_model(os.path.join(
    extract_dir_cnnfromscratch_model, 'cnnfromscratch_model'))
model_inceptionV3 = load_model(os.path.join(
    extract_dir_inceptionv3_model, 'inceptionV3_model'))
model_mobilenetV2 = load_model(os.path.join(
    extract_dir_mobilenetv2_model, 'mobilenetv2_model'))
model_resnet50 = load_model(os.path.join(
    extract_dir_resnet50_model, 'resnet50_model'))
model_vgg19 = load_model(os.path.join(extract_dir_vgg19_model, 'VGG19_model'))


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class_names = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
               'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']


@app.get('/')
def welcome():
    return {
        'success': True,
        'message': 'server of "tomato disease classification using 10 classes" is up and running successfully.'
    }


@app.post('/predict')
async def predict_disease(fileUploadedByUser: UploadFile = File(...)):

    contents = await fileUploadedByUser.read()

    imageOfUser = load_img(BytesIO(contents), target_size=(224, 224, 3))

    image_to_arr = img_to_array(imageOfUser)

    image_to_arr_preprocess_input_cnnfromscratch = image_to_arr / 255
    image_to_arr_preprocess_input_inceptionV3 = image_to_arr / 255
    image_to_arr_preprocess_input_mobilenetV2 = image_to_arr / 255
    image_to_arr_preprocess_input_resnet50 = preprocess_input(image_to_arr)
    image_to_arr_preprocess_input_vgg19 = preprocess_input(image_to_arr)

    image_to_arr_preprocess_input_expand_dims_cnnfromscratch = np.expand_dims(
        image_to_arr_preprocess_input_cnnfromscratch, axis=0)
    image_to_arr_preprocess_input_expand_dims_inceptionV3 = np.expand_dims(
        image_to_arr_preprocess_input_inceptionV3, axis=0)
    image_to_arr_preprocess_input_expand_dims_mobilenetV2 = np.expand_dims(
        image_to_arr_preprocess_input_mobilenetV2, axis=0)
    image_to_arr_preprocess_input_expand_dims_resnet50 = np.expand_dims(
        image_to_arr_preprocess_input_resnet50, axis=0)
    image_to_arr_preprocess_input_expand_dims_vgg19 = np.expand_dims(
        image_to_arr_preprocess_input_vgg19, axis=0)

    prediction_cnnfromscratch = model_cnnfromscratch.predict(
        image_to_arr_preprocess_input_expand_dims_cnnfromscratch)[0]
    prediction_inceptionV3 = model_inceptionV3.predict(
        image_to_arr_preprocess_input_expand_dims_inceptionV3)[0]
    prediction_mobilenetV2 = model_mobilenetV2.predict(
        image_to_arr_preprocess_input_expand_dims_mobilenetV2)[0]
    prediction_resnet50 = model_resnet50.predict(
        image_to_arr_preprocess_input_expand_dims_resnet50)[0]
    prediction_vgg19 = model_vgg19.predict(
        image_to_arr_preprocess_input_expand_dims_vgg19)[0]

    prediction_argmax_cnnfromscratch = np.argmax(prediction_cnnfromscratch)
    prediction_argmax_inceptionV3 = np.argmax(prediction_inceptionV3)
    prediction_argmax_mobilenetV2 = np.argmax(prediction_mobilenetV2)
    prediction_argmax_resnet50 = np.argmax(prediction_resnet50)
    prediction_argmax_vgg19 = np.argmax(prediction_vgg19)

    prediction_final_result_cnnfromscratch = class_names[prediction_argmax_cnnfromscratch]
    confidence_cnnfromscratch = np.max(prediction_cnnfromscratch) * 100

    prediction_final_result_inceptionV3 = class_names[prediction_argmax_inceptionV3]
    confidence_inceptionV3 = np.max(prediction_inceptionV3) * 100

    prediction_final_result_mobilenetV2 = class_names[prediction_argmax_mobilenetV2]
    confidence_mobilenetV2 = np.max(prediction_mobilenetV2) * 100

    prediction_final_result_resnet50 = class_names[prediction_argmax_resnet50]
    confidence_resnet50 = np.max(prediction_resnet50) * 100

    prediction_final_result_vgg19 = class_names[prediction_argmax_vgg19]
    confidence_vgg19 = np.max(prediction_vgg19) * 100

    all_predicted_results = [prediction_final_result_cnnfromscratch, prediction_final_result_inceptionV3,
                             prediction_final_result_mobilenetV2, prediction_final_result_resnet50, prediction_final_result_vgg19]
    all_confidence_results = [confidence_cnnfromscratch, confidence_inceptionV3,
                              confidence_mobilenetV2, confidence_resnet50, confidence_vgg19]

    disease_that_is_occurring_for_max_time = Counter(all_predicted_results).most_common(1)[0][0]


    confidence_of_most_common_prediction_by_the_models = [confidence for prediction, confidence in zip(all_predicted_results, all_confidence_results) if prediction == disease_that_is_occurring_for_max_time]
    
    name_of_the_models_with_common_prediction = [name_of_the_model for prediction, name_of_the_model in zip(all_predicted_results, ['Novel CNN', 'InceptionV3', 'MobileNetV2', 'Resnet50', 'VGG19']) if prediction == disease_that_is_occurring_for_max_time]

    name_of_the_model_and_its_corresponding_confidence = [f"{name_of_the_model}, {confidence_of_the_model:.2f}%" for name_of_the_model, confidence_of_the_model in zip(name_of_the_models_with_common_prediction , confidence_of_most_common_prediction_by_the_models)] 

    
    max_confidence_among_the_common_predicted_disease = np.max(confidence_of_most_common_prediction_by_the_models)

    
    about_the_disease = ''
    solution_of_the_disease = ''


    if (disease_that_is_occurring_for_max_time == 'Tomato___Bacterial_spot'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Early_blight'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___healthy'):
        about_the_disease = 'The leaf is healthy as any kind of disease is not detected in the leaf.'
        solution_of_the_disease = 'No solution is required as the leaf is healthy.'
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Late_blight'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Leaf_Mold'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Septoria_leaf_spot'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Spider_mites Two-spotted_spider_mite'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Target_Spot'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Tomato_mosaic_virus'):
        pass
    elif (disease_that_is_occurring_for_max_time == 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'):
        pass

    return {
        'success': True,
        'prediction_results_of_all_model': {
            'novel_cnn': {
                'predicted_result': prediction_final_result_cnnfromscratch,
                'confidence': f'{confidence_cnnfromscratch:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_cnnfromscratch} with a confidence of {confidence_cnnfromscratch:.2f}%'
            },
            'inceptionV3': {
                'predicted_result': prediction_final_result_inceptionV3,
                'confidence': f'{confidence_inceptionV3:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_inceptionV3} with a confidence of {confidence_inceptionV3:.2f}%'
            },
            'mobilenetV2': {
                'predicted_result': prediction_final_result_mobilenetV2,
                'confidence': f'{confidence_mobilenetV2:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_mobilenetV2} with a confidence of {confidence_mobilenetV2:.2f}%'
            },
            'resnet50': {
                'predicted_result': prediction_final_result_resnet50,
                'confidence': f'{confidence_resnet50:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_resnet50} with a confidence of {confidence_resnet50:.2f}%'
            },
            'vgg19': {
                'predicted_result': prediction_final_result_vgg19,
                'confidence': f'{confidence_vgg19:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_vgg19} with a confidence of {confidence_vgg19:.2f}%'
            },
        },
        'final_predicted_result_of_the_leaf': {
            'predicted_result_returned_by_most_of_the_models': disease_that_is_occurring_for_max_time,
            'models_that_made_the_common_prediction_along_with_their_confidence': name_of_the_model_and_its_corresponding_confidence,
            'maximum_confidence_among_the_common_disease_predicted_by_the_models': f'{max_confidence_among_the_common_predicted_disease:.2f}%',
            'final_message': f'Status of the leaf: {disease_that_is_occurring_for_max_time} with a confidence of {max_confidence_among_the_common_predicted_disease:.2f}%'
        }
    }
