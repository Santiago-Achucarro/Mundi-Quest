import { useEffect, useState } from "react";

export async function fetchDataFromApi(endpoint) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${
        endpoint == "all" ? endpoint : `region/${endpoint}`
      }`
    );
    const data = await response.json();
    // Aquí puedes manejar la respuesta de la API según tu necesidad
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
