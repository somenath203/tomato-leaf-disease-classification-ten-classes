# Use the official Python image
FROM python:3.9.7

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file into the container
COPY ./requirements.txt /code/requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the entire project directory into the container
COPY . /code

# Extract the model archive
RUN unzip /code/cnnfromscratch_model.zip -d /code/cnnfromscratch_model
RUN unzip /code/inceptionV3_model.zip -d /code/inceptionV3_model
RUN unzip /code/mobilenetv2_model.zip -d /code/mobilenetv2_model
RUN unzip /code/alexnet_model.zip -d /code/alexnet_model
RUN unzip /code/resnet50_model.zip -d /code/resnet50_model
RUN unzip /code/VGG19_model.zip -d /code/VGG19_model
RUN unzip /code/ensemble_learning_model.zip -d /code/ensemble_learning_model

# Ensure correct permissions for the extracted model directory
RUN chmod -R 777 /code/cnnfromscratch_model
RUN chmod -R 777 /code/inceptionV3_model
RUN chmod -R 777 /code/mobilenetv2_model
RUN chmod -R 777 /code/alexnet_model
RUN chmod -R 777 /code/resnet50_model
RUN chmod -R 777 /code/VGG19_model
RUN chmod -R 777 /code/ensemble_learning_model

# Command to run the FastAPI server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]