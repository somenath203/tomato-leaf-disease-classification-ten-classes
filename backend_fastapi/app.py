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

zip_path_alexnet_model = 'alexnet_model.zip'
extract_dir_alexnet_model = 'alexnet_model'

zip_path_ensemble_learning_model = 'ensemble_learning_model.zip'
extract_dir_ensemble_learning_model = 'ensemble_learning_model'


def unzipModel(zip_path, extract_dir):

    if not os.path.isdir(extract_dir):

        with zipfile.ZipFile(zip_path, 'r') as zip_ref:

            zip_ref.extractall(extract_dir)


unzipModel(zip_path_cnnfromscratch_model, extract_dir_cnnfromscratch_model)
unzipModel(zip_path_inceptionv3_model, extract_dir_inceptionv3_model)
unzipModel(zip_path_mobilenetv2_model, extract_dir_mobilenetv2_model)
unzipModel(zip_path_alexnet_model, extract_dir_alexnet_model)
unzipModel(zip_path_resnet50_model, extract_dir_resnet50_model)
unzipModel(zip_path_vgg19_model, extract_dir_vgg19_model)
unzipModel(zip_path_ensemble_learning_model,
           extract_dir_ensemble_learning_model)


model_cnnfromscratch = load_model(os.path.join(
    extract_dir_cnnfromscratch_model, 'cnnfromscratch_model'))
model_inceptionV3 = load_model(os.path.join(
    extract_dir_inceptionv3_model, 'inceptionV3_model'))
model_mobilenetV2 = load_model(os.path.join(
    extract_dir_mobilenetv2_model, 'mobilenetv2_model'))
model_resnet50 = load_model(os.path.join(
    extract_dir_resnet50_model, 'resnet50_model'))
model_vgg19 = load_model(os.path.join(extract_dir_vgg19_model, 'VGG19_model'))
model_alexnet = load_model(os.path.join(
    extract_dir_alexnet_model, 'alexnet_model'))
model_ensemble_learning = load_model(os.path.join(
    extract_dir_ensemble_learning_model, 'ensemble_learning_model'))


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
        'message': 'server of "multimodel tomato disease classification using 10 classes" is up and running successfully.'
    }


@app.post('/predict')
async def predict_disease(fileUploadedByUser: UploadFile = File(...)):

    contents = await fileUploadedByUser.read()

    imageOfUser = load_img(BytesIO(contents), target_size=(224, 224, 3))

    image_to_arr = img_to_array(imageOfUser)

    image_to_arr_preprocess_input_cnnfromscratch = image_to_arr / 255
    image_to_arr_preprocess_input_inceptionV3 = image_to_arr / 255
    image_to_arr_preprocess_input_mobilenetV2 = image_to_arr / 255
    image_to_arr_preprocess_input_alexnet = image_to_arr / 255
    image_to_arr_preprocess_input_resnet50 = preprocess_input(image_to_arr)
    image_to_arr_preprocess_input_vgg19 = preprocess_input(image_to_arr)
    image_to_arr_preprocess_input_ensemble_learning = preprocess_input(
        image_to_arr)

    image_to_arr_preprocess_input_expand_dims_cnnfromscratch = np.expand_dims(
        image_to_arr_preprocess_input_cnnfromscratch, axis=0)
    image_to_arr_preprocess_input_expand_dims_inceptionV3 = np.expand_dims(
        image_to_arr_preprocess_input_inceptionV3, axis=0)
    image_to_arr_preprocess_input_expand_dims_mobilenetV2 = np.expand_dims(
        image_to_arr_preprocess_input_mobilenetV2, axis=0)
    image_to_arr_preprocess_input_expand_dims_alexnet = np.expand_dims(
        image_to_arr_preprocess_input_alexnet, axis=0)
    image_to_arr_preprocess_input_expand_dims_resnet50 = np.expand_dims(
        image_to_arr_preprocess_input_resnet50, axis=0)
    image_to_arr_preprocess_input_expand_dims_vgg19 = np.expand_dims(
        image_to_arr_preprocess_input_vgg19, axis=0)
    image_to_arr_preprocess_input_expand_dims_ensemble_learning = np.expand_dims(
        image_to_arr_preprocess_input_ensemble_learning, axis=0)

    prediction_cnnfromscratch = model_cnnfromscratch.predict(
        image_to_arr_preprocess_input_expand_dims_cnnfromscratch)[0]
    prediction_inceptionV3 = model_inceptionV3.predict(
        image_to_arr_preprocess_input_expand_dims_inceptionV3)[0]
    prediction_mobilenetV2 = model_mobilenetV2.predict(
        image_to_arr_preprocess_input_expand_dims_mobilenetV2)[0]
    prediction_alexnet = model_alexnet.predict(
        image_to_arr_preprocess_input_expand_dims_alexnet)[0]
    prediction_resnet50 = model_resnet50.predict(
        image_to_arr_preprocess_input_expand_dims_resnet50)[0]
    prediction_vgg19 = model_vgg19.predict(
        image_to_arr_preprocess_input_expand_dims_vgg19)[0]
    prediction_ensemble_learning = model_ensemble_learning.predict(
        image_to_arr_preprocess_input_expand_dims_ensemble_learning)[0]

    prediction_argmax_cnnfromscratch = np.argmax(prediction_cnnfromscratch)
    prediction_argmax_inceptionV3 = np.argmax(prediction_inceptionV3)
    prediction_argmax_mobilenetV2 = np.argmax(prediction_mobilenetV2)
    prediction_argmax_alexnet = np.argmax(prediction_alexnet)
    prediction_argmax_resnet50 = np.argmax(prediction_resnet50)
    prediction_argmax_vgg19 = np.argmax(prediction_vgg19)
    prediction_argmax_ensemble_learning = np.argmax(
        prediction_ensemble_learning)

    prediction_final_result_cnnfromscratch = class_names[prediction_argmax_cnnfromscratch]
    confidence_cnnfromscratch = np.max(prediction_cnnfromscratch) * 100

    prediction_final_result_inceptionV3 = class_names[prediction_argmax_inceptionV3]
    confidence_inceptionV3 = np.max(prediction_inceptionV3) * 100

    prediction_final_result_mobilenetV2 = class_names[prediction_argmax_mobilenetV2]
    confidence_mobilenetV2 = np.max(prediction_mobilenetV2) * 100

    prediction_final_result_alexnet = class_names[prediction_argmax_alexnet]
    confidence_alexnet = np.max(prediction_vgg19) * 100

    prediction_final_result_resnet50 = class_names[prediction_argmax_resnet50]
    confidence_resnet50 = np.max(prediction_resnet50) * 100

    prediction_final_result_vgg19 = class_names[prediction_argmax_vgg19]
    confidence_vgg19 = np.max(prediction_vgg19) * 100

    prediction_final_result_ensemble_learning = class_names[prediction_argmax_ensemble_learning]
    confidence_ensemble_learning = np.max(prediction_ensemble_learning) * 100

    all_predicted_results = [prediction_final_result_cnnfromscratch, prediction_final_result_inceptionV3,
                             prediction_final_result_mobilenetV2, prediction_final_result_alexnet, prediction_final_result_resnet50, prediction_final_result_vgg19, prediction_final_result_ensemble_learning]
    all_confidence_results = [confidence_cnnfromscratch, confidence_inceptionV3,
                              confidence_mobilenetV2, confidence_alexnet, confidence_resnet50, confidence_vgg19, confidence_ensemble_learning]

    disease_that_is_occurring_for_max_time = Counter(
        all_predicted_results).most_common(1)[0][0]

    confidence_of_most_common_prediction_by_the_models = [confidence for prediction, confidence in zip(
        all_predicted_results, all_confidence_results) if prediction == disease_that_is_occurring_for_max_time]

    name_of_the_models_with_common_prediction = [name_of_the_model for prediction, name_of_the_model in zip(
        all_predicted_results, ['Novel CNN', 'InceptionV3', 'MobileNetV2', 'Alexnet', 'Resnet50', 'VGG19', 'Ensemble Learning(based on Novel CNN, Resnet50 and MobileNetV2)']) if prediction == disease_that_is_occurring_for_max_time]

    name_of_the_model_and_its_corresponding_confidence = [f"{name_of_the_model}: {confidence_of_the_model:.2f}%" for name_of_the_model, confidence_of_the_model in zip(
        name_of_the_models_with_common_prediction, confidence_of_most_common_prediction_by_the_models)]

    max_confidence_among_the_common_predicted_disease = np.max(
        confidence_of_most_common_prediction_by_the_models)

    about_the_disease = ''
    solution_of_the_disease = ''

    if (disease_that_is_occurring_for_max_time == 'Tomato___Bacterial_spot'):

        about_the_disease = 'Bacterial Spot of Tomato is a disease caused by a group of bacteria, including Xanthomonas vesicatoria, Xanthomonas euvesicatoria, Xanthomonas gardneri, and Xanthomonas perforans. It affects all above-ground parts of a tomato plant, leading to spots on leaves, stems, and fruit. The spots may start as small, water-soaked circles and can become brown, scabby, and rough as they mature. The disease thrives in warm, wet climates and can be severe, causing leaf yellowing and loss, unmarketable fruit, and even plant death.'
        solution_of_the_disease = 'Unfortunately, once a plant is infected, it cannot be cured. To manage the disease, remove symptomatic plants to prevent the spread of bacteria. Affected plants should be burned, buried, or hot composted. Do not consume symptomatic fruit as they can harbor human pathogens. Prevent future infections by using pathogen-free seeds or transplants, avoiding overhead watering, and considering seed treatments like soaking in hot water at 122°F for 25 minutes to kill the pathogens.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Early_blight'):

        about_the_disease = 'Tomato Early Blight is a common disease affecting tomato plants, caused by the fungus Alternaria solani. It is characterized by large, irregular spots with yellow halos on the leaves, which eventually turn yellow. The disease can affect the plant at any stage of maturity, from seedlings to mature plants, and can also impact the stems and fruits. Early Blight thrives in warm, humid conditions and can spread rapidly, especially after morning dew or heavy rainfall.'
        solution_of_the_disease = 'To manage Early Blight, it is crucial to practice preventive measures since there is no cure once the plant is infected. These include rotating crops to prevent soil-borne diseases, removing and destroying infected leaves, and avoiding overhead watering to minimize leaf wetness. Using mulch can help reduce spore splash from the soil to the plants. Some gardeners use a baking soda solution as a treatment, which involves adding one heaping tablespoon of baking soda, one teaspoon of vegetable oil, and a small amount of mild soap to one gallon of water. However, it\'s important to treat plants as early as possible and on a schedule for the best chance of managing the disease.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___healthy'):

        about_the_disease = 'The leaf is healthy as any kind of disease is not detected in the leaf.'
        solution_of_the_disease = 'No solution is required as the leaf is healthy.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Late_blight'):

        about_the_disease = 'Tomato Late Blight is a disease caused by the oomycete pathogen Phytophthora infestans. It is known for causing the Irish potato famine of the 1840s. This disease affects all above-ground parts of tomato plants, including leaves, stems, and fruit. Symptoms include irregularly shaped, water-soaked lesions on leaves, often with a lighter halo. In high humidity, white cottony growth may appear on the underside of leaves. As the disease progresses, it causes leaves to brown, shrivel, and die, and can also attack tomato fruit, leading to firm rotted areas that become leathery and chocolate brown.'
        solution_of_the_disease = 'There is no cure for Tomato Late Blight once a plant is infected. Management strategies focus on prevention and include using disease-free transplants, practicing crop rotation, and removing any infected plants or debris. Fungicides containing maneb, mancozeb, chlorothalonil, or fixed copper can help protect plants if applied before the disease strikes. It\'s also important to avoid overhead watering to reduce leaf wetness, which can facilitate the spread of the diseaseThere is no cure for Tomato Late Blight once a plant is infected. Management strategies focus on prevention and include using disease-free transplants, practicing crop rotation, and removing any infected plants or debris. Fungicides containing maneb, mancozeb, chlorothalonil, or fixed copper can help protect plants if applied before the disease strikes. It\'s also important to avoid overhead watering to reduce leaf wetness, which can facilitate the spread of the disease.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Leaf_Mold'):

        about_the_disease = 'Tomato Leaf Mold is a foliar disease caused by the fungus Passalora fulva (formerly known as Cladosporium fulvum). It primarily affects tomatoes grown in humid environments like greenhouses and high tunnels. The disease manifests as pale green to yellowish spots on the upper leaf surfaces, which turn bright yellow as they merge and progress. Infected leaves may curl, wither, and drop from the plant. The pathogen can also infect flowers, stems, and fruit, although it usually affects only the leaf tissue.'
        solution_of_the_disease = 'To manage Tomato Leaf Mold, it\'s important to use certified disease-free seed or treated seed. In greenhouses, maintain night temperatures higher than outside temperatures, remove and destroy all crop debris post-harvest, and sanitize the greenhouse between crop seasons. Use fans, stake and prune plants to increase ventilation, and avoid overhead watering to minimize leaf wetness. If the disease is detected, apply a fungicide according to the manufacturer\'s instructions at the first sign of infection.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Septoria_leaf_spot'):

        about_the_disease = 'Tomato Septoria Leaf Spot is a fungal disease caused by Septoria lycopersici. It primarily affects the older, lower leaves of tomato plants, presenting as black or brown spots with small fruiting bodies in the center. These spots can quickly spread upward, affecting new growth and making the plant susceptible to sun scorch.'
        solution_of_the_disease = 'While there is no cure for the disease once the plant is infected, management focuses on prevention and control. Remove and destroy infected plant debris, practice crop rotation, and avoid overhead watering to minimize leaf wetness. Fungicides containing copper or potassium bicarbonate can be applied as soon as symptoms appear to help control the spread of the disease.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Spider_mites Two-spotted_spider_mite'):

        about_the_disease = 'The Two-Spotted Spider Mite, Tetranychus urticae, is a common pest of tomato plants. These mites are tiny, about 1/50th of an inch, and reddish-orange in color. They cause damage by feeding on the plant tissues, which can affect foliage, flower, and fruit formation. Infested leaves may show stippling or mottled patterns with tiny white or yellow spots. Severe infestations can lead to bleached-looking plants with webbing, and if left untreated, the plant may collapse.'
        solution_of_the_disease = 'Management of spider mites includes both natural and chemical methods. Spraying the plants with water can help remove mites from the stems and leaves. Applying neem oil, which is a natural pesticide, can also be effective. This should be done every 7 days until the mites are gone. Introducing beneficial insects like ladybugs can provide biological control. In severe cases, insecticidal soaps or sprays may be necessary. It\'s important to apply these treatments as early as possible and to cover all parts of the plant, especially the undersides of leaves.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Target_Spot'):

        about_the_disease = 'Tomato Target Spot is a disease caused by the fungal pathogen Corynespora cassiicola. It can infect all above-ground parts of the tomato plant, including leaves, stems, and fruit. Symptoms begin as small, dark lesions on leaves which enlarge to form light brown lesions with a concentric pattern and a yellow halo around them. The lesions can become very large and cover significant areas of the leaf, leading to premature leaf drop and reduced photosynthesis, which can impact yield and fruit marketability.'
        solution_of_the_disease = 'Managing Tomato Target Spot involves cultural practices and fungicide applications. It\'s important to remove old plant debris at the end of the growing season to prevent spores from traveling to new plants. Crop rotation is recommended, especially avoiding areas where disease-prone plants like eggplant, peppers, potatoes, or tomatoes have been located in the past year. Ensuring good air circulation, watering at the base of the plant to keep leaves dry, and applying mulch to prevent fruit from contacting the soil are also effective strategies. Fungicides such as chlorothalonil, copper oxychloride, or mancozeb can be used, starting treatment when the first spots are seen and continuing at 10-14 days intervals until 3-4 weeks before the last harvest.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Tomato_mosaic_virus'):

        about_the_disease = 'Tomato Mosaic Virus (ToMV) is a plant pathogenic virus that is part of the tobamovirus family. It affects tomatoes and a wide range of other plants, including many agricultural crops and weeds. Symptoms in tomatoes include mottling with alternating yellowish and darker green areas, leaves that may appear fern-like with pointed tips, and younger leaves that might be twisted. The fruit can show distortions, yellow blotches, and necrotic spots, and there may be internal browning of the fruit wall. The entire plant may be dwarfed, and flowers discolored.'
        solution_of_the_disease = 'Unfortunately, there is no cure for plants infected with ToMV. Management focuses on prevention and control. It\'s important to use non-infected clean seeds and to avoid the spread of the virus through contaminated tools and the hands and clothing of workers. The virus can survive for years in dry plant debris, so removing and destroying infected plant material is crucial. Disinfecting tools and equipment with a solution like 1 percent sodium hypochlorite (bleach) can help prevent transmission. Additionally, controlling insects that can spread the virus, such as aphids and leafhoppers, is essential.'

    elif (disease_that_is_occurring_for_max_time == 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'):

        about_the_disease = 'Tomato Yellow Leaf Curl Virus (TYLCV) is a DNA virus from the genus Begomovirus and the family Geminiviridae. TYLCV causes a highly destructive disease of tomato plants, particularly in tropical and subtropical regions, leading to severe economic losses. Infected plants show stunted growth, and leaves that are small and curl upward, exhibiting strong crumpling and yellowing. The virus is transmitted by the whitefly Bemisia tabaci, and can infect other hosts like eggplants, potatoes, tobacco, beans, and peppers.'
        solution_of_the_disease = 'Unfortunately, there is no cure for plants infected with TYLCV. Management strategies focus on prevention, such as using disease-resistant tomato varieties and controlling the whitefly population to avoid infection. Infected plants should be removed and destroyed to prevent the spread of the virus. It’s also recommended to keep the garden clean and use reflective mulch and row covers to deter whiteflies.'

    return {
        'success': True,
        'prediction_results_of_all_model': [
            {
                'name_of_the_model': 'Novel CNN',
                'predicted_result': prediction_final_result_cnnfromscratch,
                'confidence': f'{confidence_cnnfromscratch:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_cnnfromscratch} with a confidence of {confidence_cnnfromscratch:.2f}%'
            },
            {
                'name_of_the_model': 'InceptionV3',
                'predicted_result': prediction_final_result_inceptionV3,
                'confidence': f'{confidence_inceptionV3:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_inceptionV3} with a confidence of {confidence_inceptionV3:.2f}%'
            },
            {
                'name_of_the_model': 'MobileNetV2',
                'predicted_result': prediction_final_result_mobilenetV2,
                'confidence': f'{confidence_mobilenetV2:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_mobilenetV2} with a confidence of {confidence_mobilenetV2:.2f}%'
            },
            {
                'name_of_the_model': 'Alexnet',
                'predicted_result': prediction_final_result_alexnet,
                'confidence': f'{confidence_alexnet:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_alexnet} with a confidence of {confidence_alexnet:.2f}%'
            },
            {
                'name_of_the_model': 'Resnet50',
                'predicted_result': prediction_final_result_resnet50,
                'confidence': f'{confidence_resnet50:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_resnet50} with a confidence of {confidence_resnet50:.2f}%'
            },
            {
                'name_of_the_model': 'VGG19',
                'predicted_result': prediction_final_result_vgg19,
                'confidence': f'{confidence_vgg19:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_vgg19} with a confidence of {confidence_vgg19:.2f}%'
            },
            {
                'name_of_the_model': 'Ensemble learning Model(based on Novel CNN, Resnet50 and MobileNetV2)',
                'predicted_result': prediction_final_result_ensemble_learning,
                'confidence': f'{confidence_ensemble_learning:.2f}%',
                'message': f'Status of the leaf: {prediction_final_result_ensemble_learning} with a confidence of {confidence_ensemble_learning:.2f}%'
            }
        ],
        'final_predicted_result_of_the_leaf': {
            'predicted_result_returned_by_most_of_the_models': disease_that_is_occurring_for_max_time,
            'models_that_made_the_common_prediction_along_with_their_confidence': name_of_the_model_and_its_corresponding_confidence,
            'maximum_confidence_among_the_common_disease_predicted_by_the_models': f'{max_confidence_among_the_common_predicted_disease:.2f}%',
            'final_message': f'Status of the leaf: {disease_that_is_occurring_for_max_time} with a confidence of {max_confidence_among_the_common_predicted_disease:.2f}%',
            'about_the_final_predicted_disease': about_the_disease,
            'cure_of_the_final_predicted_disease': solution_of_the_disease
        }
    }
