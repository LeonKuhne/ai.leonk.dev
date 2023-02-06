import {verifyEndpoints, api} from "./api.js"
import {mustache} from "./parse.js"

// verify endpoints
verifyEndpoints()

window.onload = () => {
  // define substitution state
  let state = {subject: "Articles"}

  // substitute title, description, and app
  document.title = mustache(document.title, state)
  document.querySelectorAll("meta").forEach(meta => {
    meta.content = mustache(meta.content, state)})
  let app = document.querySelector("#app")
  app.innerHTML = mustache(app.innerHTML, state)

  //  create search query
  let activeQuery = ""
  let searchBar = document.querySelector("#search-bar")
  searchBar.addEventListener("keyup", event => activeQuery = event.target.value)

  // show search results
  let searchResults = document.querySelector("#search-results")
  setInterval(() => {
    searchResults.innerHTML = activeQuery
    api.search(activeQuery)
  }, 1000)
}