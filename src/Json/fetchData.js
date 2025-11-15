// src/json/fetchData.js

const fetchAndStoreData = async () => {
  try {
    const response = await fetch("https://json-backend.vercel.app/json/691881244a71c5b4dad2e421");
    const result = await response.json();
    localStorage.setItem("apiData", JSON.stringify(result.data));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch and store on reload
window.addEventListener("load", fetchAndStoreData);

export const getstoredata = () => {
  const storedData = localStorage.getItem("apiData");
  return storedData ? JSON.parse(storedData) : null;
};
