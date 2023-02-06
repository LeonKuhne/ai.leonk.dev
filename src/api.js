const URLS = {
  API: ["https://api.leonk.dev", "http://localhost:8000"],
  WEB: ["https://ai.leonk.dev", "http://localhost:3030"],
}
const URL = document.location.href
const endpoints = (base) => ({
  web: `${URL}/`,
  search: (query) => `${base}/search?q=${query}`,
  generate: (query) => `${base}/generate?q=${query}`,
})
const dummyResults = {
  search: {
    results: [
      {title: "Mr Roboto Wikipedia", url: "https://en.wikipedia.org/wiki/Mr._Roboto"},
    ]
  },
}

const net = (url, callback, data={}) => {
  fetch(url, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // add data if body exists, else don't add body at all
    ...(data ? {body: JSON.stringify(data)} : {})
  })
  .then(res => callback(res))
  .catch(err => console.warn(err))
}

let apiBuilder = (base) => {
  return {
    search: (query, callback) => 
      net(endpoints(base).search(query), callback),
    generate: (query, callback) => 
      net(endpoints(base).generate(query), callback),
  }
}

export let api = {}

// verify api, replace failed with dummy
export const verifyEndpoints = () => {
  URLS.API.forEach((base) => {
    net(base, (res) => {
      if (res.status == 200) {
        api = apiBuilder(base)
      }
    })
  })
}