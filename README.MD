# RESTful API code example with Node, Restify, TypeScript, DynamoDB and AWS-SDK Promises

## Instructions

1. Fork/Clone
2. Install dependencies - `npm install`
3. Compile - `gulp compile`
4. Change AWS Credentials (config/config.ts)
5. Run the development server - `npm start`

## API EndPoints
### GET EndPoints
* Get all movies: http://localhost:3000/api/movie
* Get specific movie http://localhost:3000/api/movie/:id
### POST EndPoint
* http://localhost:3000/api/movie
### PUT EndPoint
* http://localhost:3000/api/movie/:id
### DELETE EndPoint
* http://localhost:3000/api/movie/:id

## Initial and Example Data
```
{
    "id": 2,
    "title": "Snatch",
    "description": "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers, and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
    "cast": [
      "Jason Statham",
      "Brad Pitt",
      "Benicio del Toro"
    ]
  },
  {
    "id": 1,
    "title": "Saving private Ryan",
    "description": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    "cast": [
      "Tom Hanks",
      "Matt Damon",
      "Tom Sizemore"
    ]
  }
```

