# Moniques Rezepte

Django app with React frontend for sharing recipes

## Deployment

App deployed on render.com and available at https://moniques-rezepte.onrender.com/

A Postgres database for storing recipes and users is also hosted on render.com.

Image is built with

```
docker build -t ghcr.io/jonathan-grumke/app-image .
```

and pushed to GitHub container registry with

```
docker push ghcr.io/jonathan-grumke/app-image
```

When working on apple-silicon and deploying on render.com you need to set the environment variable DOCKER_DEFAULT_PLATFORM before building the image:

```
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

## Development

Run the app locally with

```
docker compose up -d
```

Then apply migrations for Postgres database using

```
docker exec -it app-container python manage.py migrate
```

and create superuser with

```
docker exec -it app-container python manage.py createsuperuser
```
