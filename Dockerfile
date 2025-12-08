#######################################
# Stage 1 - Build React frontend
#######################################
FROM node:20 AS frontend-builder

# Set working directory
WORKDIR /app/frontend

# Copy package files and install deps
COPY frontend/package.json frontend/package-lock.json .
RUN npm install --legacy-peer-deps

# Copy the React source
COPY frontend/ /app/frontend/

# Build the frontend
RUN npm run build


#######################################
# Stage 2 - Python builder (install dependencies)
#######################################
FROM python:3.13-slim AS python-builder

# Create the app directory
RUN mkdir /app

# Set the working directory inside the container
WORKDIR /app
 
# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 
 
# Upgrade pip
RUN pip install --upgrade pip 
 
# Copy the Django project  and install dependencies
COPY requirements.txt /app/
 
# run this command to install all dependencies 
RUN pip install --no-cache-dir -r requirements.txt
 

#######################################
# Stage 3 - Production image
#######################################
FROM python:3.13-slim

RUN useradd -m -r appuser && \
    mkdir /app && \
    chown -R appuser /app

# Copy the Python dependencies from the builder stage
COPY --from=python-builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=python-builder /usr/local/bin/ /usr/local/bin/

# Set the working directory
WORKDIR /app

# Copy Django application code
COPY --chown=appuser:appuser . .

# Copy React build to Django static files
COPY --from=frontend-builder /app/frontend/build/ ./frontend/build/

RUN python manage.py collectstatic --noinput

# Set environment variables to optimize python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Switch to non-root user
USER appuser

# Expose the Django port
EXPOSE 8000
 
# Start the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "config.wsgi:application"]
