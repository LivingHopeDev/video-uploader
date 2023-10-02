# INTRODUCTION

This API is a simple and user-friendly application programming interface designed for uploading video files to the server. No database is involved and so the videos are stored on ther server.

The API functionalities includes:

1. Uploading videos and getting the video link as a response.
2. Getting the list of available videos in the server.
3. Streaming a sigle video based on the video name .

## Getting started

### Installation

Developers who are interested in using this API should have node installed on their local machines if not already installed.

- Live url `https://video-uploader-75kg.onrender.com/api/video/`
  `

### Clone the repository

```
git clone https://github.com/LivingHopeDev/video-uploader

```

- move into the cloned directory

```
cd nameAPI
```

To install all dependencies, run `npm install`

### Configuration

Create a `.env` file in the project's root directory and define the following environment variables

```
PORT=5000
```

To run the application, run any of the commands

```
nodemon app
node app
```

The application will run on `http://127.0.0.1:5000/`.

## API Reference

### Endpoints

To test for the endpoints, the developer should have installed Postman or thunder client or any other application with similar capability or use curl.

#### GET

Returns a list of names and their respective id with a success status .
Sample: `http://127.0.0.1:5000/api/video`

```

{
    "message": [
        "http://video-uploader-75kg.onrender.com/api/video/Tiger_Dangerous_Wild_Animals___tiger_vs_humen___Wild_Adventure__Shorts.mp4"
    ]
}

```

#### GET /name

Returns details of the person with the id.

sample: `http://127.0.0.1:5000/api/video/name`

```
streams the video from the server

```

#### POST

This endpoint adds a new name to the database. It returns a success value.
sample: `http://127.0.0.1:5000/api/video/upload`

- body (form data)

```
{
    "video": "Tiger Dangerous Wild Animals - tiger vs humen - Wild Adventure #Shorts"
}
```

```


{
    "staus": "Success",
    "message": "Video uploaded",
    "url": "http://video-uploader-75kg.onrender.com/api/video/Tiger_Dangerous_Wild_Animals___tiger_vs_humen___Wild_Adventure__Shorts.mp4"
}

```
