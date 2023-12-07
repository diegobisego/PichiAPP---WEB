import axios from "axios";

export const getApiCountries = async () => {
  try {
    const response = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
      headers: {
        "Accept": "application/json",
        "api-token": process.env.NEXT_PUBLIC_API_COUNTRIES,
        "user-email": process.env.NEXT_PUBLIC_API_COUNTRIES_MAIL
      }
    });

    return response.data;
  } catch (error) {
    // Aquí puedes manejar errores
    console.error(error);
    throw error; // Puedes relanzar el error si lo manejas más arriba
  }
};



