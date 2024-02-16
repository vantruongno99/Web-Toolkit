
const domain = import.meta.env.PROD ? `http://${window.location.hostname}:3001/api` :  "http://localhost:3001/api" 




export {domain}