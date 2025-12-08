# Moniques Rezepte

Django app with React frontend for sharing recipes

## Deployment

App deployed on render.com and available at https://moniques-rezepte.onrender.com/

A Postgres database for storing recipes and users is also hosted on render.com.

Build the image with

```
docker build -t ghcr.io/<username>/<app-image> .
```

and push to the GitHub container registry with

```
docker push ghcr.io/<username>/<app-image>
```

Use the following line to login to the Github container registry. Replace `<username>` with GitHub username and `<token>` with a personal access token from GitHub.

```
docker login ghcr.io --username <username> --password <token>
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
