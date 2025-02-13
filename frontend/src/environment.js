let IS_PROD = true;
const server = IS_PROD ?
    "https://mnnit-videocall-app-backend.onrender.com" :

    "http://localhost:8000"


export default server;