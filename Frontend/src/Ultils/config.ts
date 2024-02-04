
const domain = import.meta.env.PROD ? `http://${window.location.hostname}:3001/api` :  "http://170.64.212.219:3001/api" 




export {domain}