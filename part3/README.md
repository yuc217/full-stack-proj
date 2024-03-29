# part3 exercise 3.1 - 3.11

phonebook getall, getone, add, delete 

backend deploy on fly.io - fly deploy
fronend production build - npm run build

https://part3-front-end.fly.dev/

connected to mongodb through Mongoose, use env var for pwd in uri path

check style thru lint - npm run lint

front-end change:
// in services
const baseUrl = '/api/persons'
// in main file
 .catch(error => {
        handleNotification(error.response.data.error, 'error');
        console.error('Error creating new person:', error);
    }) 