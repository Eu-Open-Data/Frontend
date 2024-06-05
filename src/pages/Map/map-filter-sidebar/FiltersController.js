import getData from "./fetch.enum";

const BACKEND_IP = "http://54.167.96.255:5000/";

const fetchData = async (type, data) => {
  const origin = BACKEND_IP + type;
  const params = new URLSearchParams(data);
  let response = "No response";

  try {
    const fetchResponse = await fetch(`${origin}?${params.toString()}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Doing Call: " + `${origin}?${params.toString()}`);

    response = await fetchResponse.json();
    response = JSON.stringify(response);
    //console.log("Response: " + response);
  } catch (error) {
    console.log("Fetch failed", error);
  }

  return response;
};

// exemples of calls
fetchData(getData.COUNTRIES);
fetchData(getData.AMENITIES);
fetchData(getData.CITIES, {
  country: "Romania",
});
fetchData(getData.SEARCH, {
  search_phrase: "Holiday Inn",
  max_count: 20,
  amenities: "Internet, Non-smoking hotel",
  cities: "Bucharest, Vienna",
  countries: "Austria, Romania, Finland",
});

export default fetchData;
