const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');

let allCountriesData = [];

// Fetch all countries data once and store it for filtering
fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    renderCountries(data);
  })
  .catch((error) => console.error('Error fetching countries:', error));

// Filter by region
filterByRegion.addEventListener('change', (e) => {
  const selectedRegion = e.target.value;
  if (selectedRegion) {
    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
      .then((res) => res.json())
      .then(renderCountries)
      .catch((error) => console.error('Error fetching region:', error));
  } else {
    // If no region is selected, show all countries
    renderCountries(allCountriesData);
  }
});

// Render countries
function renderCountries(data) {
  countriesContainer.innerHTML = '';
  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}

// Search by country name
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  renderCountries(filteredCountries);
});

// Toggle theme
themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
