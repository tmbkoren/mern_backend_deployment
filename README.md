# mern_backend_deployment
For local usage: 
create a nodemon.json file in root folder and structure it like this: 
{
  "env": {
    "DB_USER": "your_mongodb_database_username",
    "DB_PASSWORD": "your_mongodb_database_password",
    "DB_NAME": "yout_database_name", //it has to contain 2 collections : places and users , you have to create them manually
    "GOOGLE_API_KEY": "your_google_api_key",
    "JWT_TOKEN_KEY": "a jwt token, can be any string"
  }
}
