# Tomato Disease Classification on 10 classes (9 disease class + 1 healthy class)

## Introduction

Welcome to our project. In this project, we use deep learning techniques to identify diseases in tomato leaves. It helps farmers know more about the health of their crops, providing valuable insights for effective crop management. Currently, our model is able to detect 9 diseases of tomato leaf and those are:
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

We've developed and tested 9 deep learning models for disease classification:

1. **Our own CNN Model**
   - Training Accuracy: 87.33%
   - Testing Accuracy: 87.40%

2. **MobileNetV2**
   - Training Accuracy: 94.52%
   - Testing Accuracy: 89.20%

3. **MobileNetV3**
   - Training Accuracy: 96.95%
   - Testing Accuracy: 94.90%

4. **VGG16**
   - Training Accuracy: 95.59%
   - Testing Accuracy: 88.89%

5. **VGG19**
   - Training Accuracy: 94.73%
   - Testing Accuracy: 87.99%

6. **ResNet50**
   - Training Accuracy: 97.32%
   - Testing Accuracy: 92.19%

7. **ResNet101** (Best Performing Model)
   - Training Accuracy: 97.39%
   - Testing Accuracy: 94.30%

8. **Ensemble Learning (Average Method)**
   - Based on our own CNN, VGG16, and VGG19 model
   - Training Accuracy: 95.78%
   - Testing Accuracy: 89.60%

9. **Ensemble Learning (Concatenate Method)**
   - Based on our own CNN, VGG16, and VGG19 model
   - Training Accuracy: 94.22%
   - Testing Accuracy: 87.19%

***Out of all the models, ResNet101 model stands out as the most effective one, with a training accuracy of 97.39% and testing accuracy of 94.30%.***

## About the FastAPI API

Our project uses FastAPI that connects the deep learning models to the frontend webapp, facilitating real-time disease prediction.

## About the ExpressJS API 

We uses ExpressJS API for data management, including user and prediction data storage in a MongoDB database, along with user authentication mechanisms.

## About the Frontend Web Application

The frontend of this project is created with the help of ReactJS. It is integrated with our deep learning models via FastAPI, enabling users to upload tomato leaf images and receive the predcited result accordingly.

## Deployment

The frontend of the project is deployed on Vercel, the ExpressJS API of the project is deployed on Render and the FastAPI API of the deep learning model is deployed on HuggingSpace Spaces.

## Links
1) Live Preview of the project: https://healthy-tomato.vercel.app/
2) FastAPI API of the deep learning model: https://som11-tomato-disease-classification-10-classes.hf.space/
3) Swagger documentation of the deep learning model: https://som11-tomato-disease-classification-10-classes.hf.space/docs
4) ExpressJS API of the project: https://tomato-leaf-classification-project-10.onrender.com/

## Warning

While the model of this project can classify the tomato leaf disease correctly, but in some cases, the model may misclassify disease or fail to detect them altogether, therefore, it is strongly advised not to rely solely 
on the output of this model.
