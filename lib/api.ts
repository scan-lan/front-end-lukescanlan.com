const getStrapiURL = (path = "") => {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
};

// Helper to make GET requests to Strapi
const getFromAPI = async (path: string) => {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
};

export { getStrapiURL, getFromAPI as fetchAPI };
