# Tomato Leaf Disease Classification on 10 classes (9 disease class + 1 healthy class)

## Introduction

Welcome to the project. In this project, deep learning techniques are used to detect and classify diseases in tomato leaves. This project is designed to help farmers know more about the health of their crops, providing valuable insights for effective crop management. Currently, the model is able to detect 9 diseases of tomato leaf and those are:
1) Tomato_mosaic_virus
2) Target_Spot
3) Bacterial_spot
4) Tomato_Yellow_Leaf_Curl_Virus
5) Late_blight
6) Leaf_Mold
7) Early_blight
8) Spider_mites Two-spotted_spider_mite
9) Septoria_leaf_spot

## About the Deep Learning Models 

A total of 7 deep learning models are trained on 30 epochs for disease classification:

1. **Novel CNN Model**
   - Training Accuracy: 94.52%
   - Testing Accuracy: 93.00%

2. **MobileNetV2**
   - Training Accuracy: 96.78%
   - Testing Accuracy: 91.69%

3. **VGG19**
   - Training Accuracy: 97.31%
   - Testing Accuracy: 89.60%

4. **ResNet50**
   - Training Accuracy: 99.11%
   - Testing Accuracy: 94.59%

5. **InceptionV3** 
   - Training Accuracy: 89.42%
   - Testing Accuracy: 83.99%

6. **Alexnet** 
   - Training Accuracy: 97.13%
   - Testing Accuracy: 94.40%

7. **Ensemble Learning (Average Method)**
   - Based on the Novel CNN, Resnet50, and MobileNetV2 model
   - Training Accuracy: 98.94%
   - Testing Accuracy: 94.40%


**Out of all the models, ResNet50 model stands out as the most effective one, with a training accuracy of 99.11% and testing accuracy of 94.59%.**

## About the FastAPI API

The project uses FastAPI that connects the deep learning models to the frontend webapp, facilitating real-time disease prediction.

## About the ExpressJS API 

ExpressJS API is used for implementing user authentication and overall data management of the application like storing details of user, prediction result and feedback of the user in MongoDB database.

## About the Frontend Web Application

The frontend of this project is developed using ReactJS. It interfaces with deep learning models through FastAPI, allowing users to upload images of tomato leaves and obtain the predicted results. The web application features:

- A Predict Page Section: Takes Tomato Leaf Image as input and return the predicted disease accordingly.
- A Resource Section: Displays each and every detail about the various tomato diseases.
- A Profile Section: Displays the logged-in user's profile picture, full name, and email address.
- A History Page: Lists all the prediction records made by the user to date.
- An About Us Page: Provides an overview of the project and includes a "Give Feedback" button which user can use to provide feedback about the application.


## About the Tomato Leaf Image validation

A check is implemented in the frontend webapp that confirms whether an image uploaded by the user is indeed an image of a leaf or not before passing the image to the model. If the uploaded image is not that of a leaf, then, an error toast is thrown to the user saying him/her that the uploaded image is not a leaf image. The model used for this check is InceptionV2 model that is trained on a dataset which is a combination of tomato leaf and cifar10 dataset where tomato leaf is marked the label of `leaf` and cifar10 images is marked the label of `not_leaf`.

## Deployment

The frontend of the project is deployed on Vercel, the ExpressJS API of the project is deployed on Render and the FastAPI API of the deep learning model is deployed on HuggingSpace Spaces.

## Links
1) Live Preview of the project: https://healthy-tomato.vercel.app/
2) FastAPI API of the deep learning model: https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/
3) Swagger documentation of the deep learning models: https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/docs
4) FastAPI API of the check that confirms whether an uploaded image is that of a leaf or not: https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/
5) Swagger documentation of the check that confirms whether an uploaded image is that of a leaf or not: https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/docs
4) ExpressJS API of the project: https://tomato-leaf-classification-project-10.onrender.com/

## Warning

While the models are able to classify the tomato leaf disease accurately, in some cases, they may misclassify the disease or fail to detect it altogether. Therefore, it is strongly advised not to rely solely on the output of these models.
