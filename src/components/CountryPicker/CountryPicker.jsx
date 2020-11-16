import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';


const CountryPicker = ({ handleCountryChange }) => {
  // Create a state array of countires we can select
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    }

    fetchAPI(); // get the list of countries we can select by bane
  }, []);

  ////console.log("list of countries: ", fetchedCountries);

  // For each of the countries selectable, create an option to select them in the drop down
  // when onChange changes, call the handleCountryChange function passed down from app,js
  //    which updates the state county in app.js
  return (
    <FormControl className={ styles.formControl }>
      <NativeSelect defaultValue="" onChange={ (e) => handleCountryChange(e.target.value)}>
        <option value="">USA</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;