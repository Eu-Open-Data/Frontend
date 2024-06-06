const DEV_BACKEND_IP = "http://54.167.96.255:8081/";

export const requestGet = async (type, data) => {
  return fetchData(type, data, "GET")
};

export const requestPost = async (type, data) => {
  const origin = DEV_BACKEND_IP + type;
  let result = "No response";
  try {
    const response = await fetch(origin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
      result = JSON.stringify(result);
    } else {
      result = await response.text();
    }

    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }

  return result;
};


export const fetchData = async (type, data, method) => {
  const origin = DEV_BACKEND_IP + type;
  const params = new URLSearchParams(data);
  let response = "No response";

  try {
    const fetchResponse = await fetch(`${origin}?${params.toString()}`, {
      method: method,
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




export default {requestGet, requestPost, fetchData};