# tmdb-watchlist-prisma

This app uses TMDB to retrieve a list of Now Playing movies.  You can add/remove movies to track which ones you've watched.  There's a "fake" auth flow as well to show navigation as well as tRPC middleware.

Simple app that showcases the following technology.

Expo + tRPC + Prisma + NextJS + Nx + zod + react-hook-form

![alt text](./ss-splash.png "splash")
![alt text](./ss-signin.png "splash")
![alt text](./ss-nowplaying.png "splash")
![alt text](./ss-mywatchlist.png "splash")
![alt text](./ss-signout.png "splash")


## Setup

Add your database and TMDB bearer token (instructions [here](https://www.themoviedb.org/documentation/api?language=en-US)) to the `.env` file.  If you aren't using Postgres, make the appropriate changes to the Prisma schema.

Run `yarn prisma:codegen` and `yarn prisma:migrate` to setup the DB and generated client.

## Running the App

### Run the API

`nx serve next-app`

### Run the App

`nx run-ios mobile`
