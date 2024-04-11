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
RUN unzip /code/inceptionV2_model.zip -d /code/inceptionV2_model

# Ensure correct permissions for the extracted model directory
RUN chmod -R 777 /code/inceptionV2_model

# Command to run the FastAPI server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
