# Movie App

A React app that uses [The Movie Database (TMDb) API](https://www.themoviedb.org/) to display trending movies and TV shows, upcoming movies, TV series airing today, movie details, trailers, cast information, and more.

## Features

- View trending movies and TV shows.
- See upcoming movies and TV series airing today.
- Get detailed information about movies and TV shows.
- Watch trailers.
- View cast information.
- Explore similar movies and TV shows.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **React Query**: For fetching and caching server data.
- **Axios**: For making HTTP requests.
- **TailwindCSS**: For styling the app.
- **React Router**: For navigation between pages.

## Installation

1. Clone the repo:

    ```bash
    git clone https://github.com/your-username/movie-app.git
    ```

2. Install dependencies:

    ```bash
    cd movie-app
    npm install
    ```

3. Add your TMDb API key to the `.env` file:

    ```env
    REACT_APP_TMDB_TOKEN=your_api_key_here
    ```

4. Start the app:

    ```bash
    npm start
    ```
---
### How to Get Your TMDb API Key

To use the app, you'll need an API key from The Movie Database (TMDb). Follow these steps to get your API key:

---

#### 1. Visit the TMDb Website
Go to [TMDb's official website](https://www.themoviedb.org/).

---

#### 2. Create an Account or Log In
- If you don't have an account, click **Sign Up** to create one.
- If you already have an account, click **Login** and enter your credentials.

---

#### 3. Navigate to the API Section
- After logging in, go to the [TMDb API page](https://www.themoviedb.org/settings/api) to find API-related information.
- You can also find the API link in the settings menu under your profile.

---

#### 4. Create a New API Key
- On the API page, click the **Create** button to generate a new API key.
- You will be prompted to provide some basic information about how you plan to use the API. Fill this out according to your needs.

---

#### 5. Copy Your API Key
Once your API key is generated, copy it to your clipboard.

---

#### 6. Add the API Key to Your Project
- In your project directory, create a file named `.env` if it doesn’t already exist.
- Add the following line to the `.env` file:

  ```plaintext
  REACT_APP_TMDB_TOKEN=your_api_key_here



---

  ## API Integration

This app uses the [TMDb API](https://www.themoviedb.org/documentation/api) to fetch data like:

- Trending movies and TV shows
- Upcoming movies
- TV series airing today
- Movie/TV show details
- Trailers
- Cast information
- Similar movies and TV shows


   ```plaintext
   REACT_APP_TMDB_TOKEN=your_api_key_here
