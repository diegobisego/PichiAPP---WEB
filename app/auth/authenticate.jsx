'use server'

import axios from "axios";


export async function authenticate(formData) {

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  
    return result.data.accessToken;

  } catch (error) {
    throw new Error(`Se produjo un error: ${error.message}`);
  }
}
