import axios from "axios";

const getStrapiURL = () => process.env.API_URL || "http://localhost:1337/api";

const api = axios.create({
  baseURL: getStrapiURL(),
  timeout: 1000,
});

// Helper to make GET requests to Strapi
const getFromAPI = async <T>(path: string, queryString = "populate=*") => {
  try {
    const requestUrl = `${path}?${queryString}`;

    const response = await api.get<T>(requestUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // if (process.env.NODE_ENV !== "production") {
      console.log("http request failed");
      console.log(error);
      // }
    } else {
      // if (process.env.NODE_ENV !== "production") {
      console.log("unexpected error");
      console.log(error);
      // }
    }
  }
};

export { getStrapiURL, getFromAPI };
