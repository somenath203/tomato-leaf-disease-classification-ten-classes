import zipfile
import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from keras.models import load_model
from keras.utils import load_img, img_to_array
from io import BytesIO


app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



zip_path = 'inceptionV2_model.zip'

extract_dir = 'inceptionV2_model'


if not os.path.isdir(extract_dir):

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:

        zip_ref.extractall(extract_dir)



model = load_model(os.path.join(extract_dir, 'inceptionV2_model'))



class_names = ['leaf', 'not leaf']


@app.get('/')
def welcome():
    return {
        'success': True,
        'message': 'server of "tomato leaf or not leaf prediction" is up and running successfully.'
    }


@app.post('/predict')
async def predict_disease(fileUploadedByUser: UploadFile = File(...)):

    contents = await fileUploadedByUser.read()

    imageOfUser = load_img(BytesIO(contents), target_size=(224, 224, 3))

    image_to_arr = img_to_array(imageOfUser)

    image_to_arr_preprocess_input = image_to_arr / 255

    image_to_arr_preprocess_input_expand_dims = np.expand_dims(
        image_to_arr_preprocess_input, axis=0)

    prediction = (model.predict(image_to_arr_preprocess_input_expand_dims) > 0.5).astype('int32')

    pred_final_result = class_names[prediction[0][0]]

    return {
        'success': True,
        'predicted_result': pred_final_result
    }