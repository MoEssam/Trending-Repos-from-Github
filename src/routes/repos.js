const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const fs = require("fs");

router.get("/repos", async (req, res) => {
  const api_url =
    "https://api.github.com/search/repositories?q=created:>30&sort=stars&order=desc&per_page=100";
  const response = await fetch(api_url);
  const data = await response.json();

  var urls = data.items
    .map((a) => ({
      language: a.language,
      url: a.url,
    }))
    .filter((el) => {
      return el.language != null;
    });

  result = Object.entries(
    urls.reduce((r, { language, url }) => {
      if (!r[language]) r[language] = [];
      r[language].push(url);
      return r;
    }, {})
  ).map(([language, urls]) => ({ language, urls, count: urls.length }));
  fs.writeFileSync("100 trending repos.json", JSON.stringify(result, null, 2));
  res.send(result);
});

module.exports = router;
