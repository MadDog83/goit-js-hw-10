
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Xv6PI3iLZUZ4pw7opRL1xePIFKo7Q4OkdfELLxbOAzMn5octTXCBJombMv1JP6l7";

export async function fetchBreeds() {
  try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

export async function fetchCatByBreed(breedId) {
  try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        return response.data[0];
    } catch (error) {
        return console.error(error);
    }
}
