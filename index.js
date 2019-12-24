const apiKey = "hiJqIHsYwkie5YYpDcESY45F7M9c13o3SeCdH4Nc";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = object.keys(params)
    .map(key => `${key}=${params[key]}`);
    return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  for(let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `
      <li><h3>${responseJson.data[i].fullName}</h3></li>
      <ul>
        <li>${responseJson.data[i].description}</li>
        <li>${responseJson.data[i].url}</li>
        <li>${responseJson.data[i].latLong}</li>
      </ul>
      `);}
  $('#results').removeClass('hidden');
}

function getParks(states, maxResults=10) {
  const params = {
    stateCode: states,
    limit: maxResults,
    apiToken: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const states = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(states, maxResults);
  });
}

$(watchForm);
