# 🍅 Tomato Leaf Disease Classification on 10 Classes (9 Disease Classes + 1 Healthy Class)

## 🎥 Demo Video of the Whole Application  

![tomatoleafprojectpic](https://github.com/user-attachments/assets/29c786c3-041a-4875-8ec7-daeefd62b034)  

🔗 [Click here to watch the demo video](https://www.youtube.com/watch?v=H4-kjJWBXrM)  

---

## 🛠️ Introduction  

Welcome to the project! This initiative leverages deep learning to detect and classify diseases in tomato leaves 🌱. Designed to assist farmers 👩‍🌾, it provides valuable insights for effective crop management. The model currently identifies 9 tomato leaf diseases:  

1️⃣ Tomato Mosaic Virus  
2️⃣ Target Spot  
3️⃣ Bacterial Spot  
4️⃣ Tomato Yellow Leaf Curl Virus  
5️⃣ Late Blight  
6️⃣ Leaf Mold  
7️⃣ Early Blight  
8️⃣ Spider Mites (Two-Spotted Spider Mite)  
9️⃣ Septoria Leaf Spot  

---

## 📊 About the Deep Learning Models  

Seven deep learning models were trained over 30 epochs for disease classification 🚀:  

1. **Novel CNN Model**  
   - ✅ Training Accuracy: 94.52%  
   - 📈 Testing Accuracy: 93.00%  

2. **MobileNetV2**  
   - ✅ Training Accuracy: 96.78%  
   - 📈 Testing Accuracy: 91.69%  

3. **VGG19**  
   - ✅ Training Accuracy: 97.31%  
   - 📈 Testing Accuracy: 89.60%  

4. **ResNet50**  
   - ✅ Training Accuracy: 99.11%  
   - 📈 Testing Accuracy: 94.59%  

5. **InceptionV3**  
   - ✅ Training Accuracy: 89.42%  
   - 📈 Testing Accuracy: 83.99%  

6. **AlexNet**  
   - ✅ Training Accuracy: 97.13%  
   - 📈 Testing Accuracy: 94.40%  

7. **Ensemble Learning (Average Method)**  
   - 🔗 Combines Novel CNN, ResNet50, and MobileNetV2  
   - ✅ Training Accuracy: 98.94%  
   - 📈 Testing Accuracy: 94.40%  

💡 **ResNet50** stands out as the most effective model, achieving a training accuracy of 99.11% and testing accuracy of 94.59%!  

---

## 🌐 About the FastAPI API  

The project employs FastAPI to connect the deep learning models with the frontend, enabling real-time disease prediction 🔄.  

---

## 💾 About the ExpressJS API  

The ExpressJS API is utilized for user authentication 🔒 and data management 📂. It stores user details, prediction results, and feedback in a MongoDB database.  

---

## 🖥️ About the Frontend Web Application  

The ReactJS-powered frontend offers users a seamless experience ✨. Key features include:  

- 🔮 **Predict Page**: Upload a tomato leaf image and get the predicted disease.  
- 📚 **Resource Section**: Learn about various tomato diseases in detail.  
- 👤 **Profile Section**: View the user's profile picture, full name, and email address.  
- 🕒 **History Page**: Track all prediction records.  
- ℹ️ **About Us Page**: Learn about the project and provide feedback via the "Give Feedback" button.  

---

## 🔍 About Tomato Leaf Image Validation  

The app checks whether the uploaded image is a leaf 🌿 using an InceptionV2 model trained on a dataset combining tomato leaf and CIFAR-10 images. If the image isn't a leaf, an error toast notifies the user 🚫.  

---

## 🚀 Deployment  

The project is deployed across multiple platforms:  

- **Frontend**: Vercel  
- **ExpressJS API**: Render  
- **FastAPI API**: Hugging Face Spaces  

---

## 🔗 Links  

1️⃣ **Live Preview**: [https://healthy-tomato.vercel.app/](https://healthy-tomato.vercel.app/)  
2️⃣ **FastAPI Deep Learning Model API**: [https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/](https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/)  
3️⃣ **Swagger Documentation (Deep Learning Models)**: [https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/docs](https://som11-multimodel-tomato-disease-classification-t-1303b88.hf.space/docs)  
4️⃣ **FastAPI Leaf Validation API**: [https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/](https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/)  
5️⃣ **Swagger Documentation (Leaf Validation)**: [https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/docs](https://som11-tomato-leaf-or-not-tomato-leaf.hf.space/docs)  
6️⃣ **ExpressJS API**: [https://tomato-leaf-classification-project-10.onrender.com/](https://tomato-leaf-classification-project-10.onrender.com/)  

---

## ⚠️ Warning  

Although the models achieve high accuracy 🏆, they may occasionally misclassify diseases or fail to detect them entirely. Do not rely solely on the model's output. Use it as an aid, not as the sole source of decision-making. 🌟
