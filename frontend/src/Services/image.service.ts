import axios, { AxiosError } from 'axios'

const API_SECRET = 'Et2JrhqMuTvc7Ij-dFnnkBq9OUg';
const API_KEY = '849575328118679';
const CLOUD_NAME = 'ds8ifuvcc';





const uploadImage = async (image: File): Promise<{ url: string } | undefined> => {
    try {

        const formData = new FormData();
        formData.append("file", image);
        formData.append("api_key", API_KEY)
        formData.append('upload_preset', 'zwofg2u5');


        const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData)

        return res.data

    }
    catch (e) {
        console.error(e)
    }
}
const imageService = {
    uploadImage
}

export default imageService