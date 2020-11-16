import axios from 'axios';

const url = 'https://covid19.mathdro.id/api' // API Starting point

// Fetch the total counts data to fill out the cards for totals
export const fetchData = async (country) => {
  try {

    let changeableURL = url;

    if (country) {
      changeableURL = `${url}/countries/${country}`
    }

    // destructuring equivalent of response.data.confirmed ....
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableURL);

    // Get only the data you want
    return { confirmed, recovered, deaths, lastUpdate }

  } catch (error) {
    console.log(error);
    return error;
  }
}


// Fetch the historic daily data to build out the charts
export const fetchDailyData = async () => {
  try {

    // Get the response JSON from the API
    const { data } = await axios.get(`${url}/daily`);

    //Destructure the data
    //console.log("Response of fetchDailyData() in api/index.js: :", response)
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    ////console.log("modified data: ", modifiedData);
    return modifiedData;

  } catch (error) {
    return error;
  }
}


// Fetch the other countries data
export const fetchCountries = async () => {
  try {

    const { data: { countries }} = await axios.get(`${url}/countries`);
    ////console.log("COUNTRIES GOT BACK FROM API: ", response);

    return countries.map((country) => country.name); // just get the country name

  } catch (error) {

  }
}