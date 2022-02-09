const getStrapiURL = (path = "") => {
  return `${process.env.API_URL || "http://localhost:1337/api"}${path}`;
};

// Helper to make GET requests to Strapi
const getFromAPI = async (path: string, queryString = "populate=*") => {
  const requestUrl = getStrapiURL(`${path}?${queryString}`);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
};

export { getStrapiURL, getFromAPI };
