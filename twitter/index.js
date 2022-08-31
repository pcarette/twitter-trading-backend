const { response } = require("express");
const needle = require("needle");
const config = require("dotenv").config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL =
  "https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id";

const rules = [{ value : "📈 from:Pierre1Carette" }];

//Get streaming rules :

async function getRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log("Get rules finished : ", response.body);
  return response.body;
}
//Set streaming rules :

async function setRules() {
  const data = {
    add: rules,
  };
  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log("Set rules finished : ", response.body);
  return response.body;
}

//Delete streaming rules :

async function deleteRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }
  const ids = rules.data.map((rule) => rule.id);
  const data = {
    delete: {
      ids: ids,
    },
  };
  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log("Rules deleted : ", response.body);
  return response.body;
}

function streamTweets() {
  const stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  stream.on("data", (data) => {
    try {
      const json = JSON.parse(data);
      const fullText = json.data.text;
      lines = fullText.split("\n")
      console.log(lines);
    } catch (error) {}
  });
}

(async () => {
  let currentRules;
  try {
    //get all stream rules
    currentRules = await getRules();
    console.log(currentRules);
    //passing it to the deleteRules function
    await deleteRules(currentRules);

    //Setting the rules based on line 10
    await setRules();
    currentRules = await getRules();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  streamTweets()
})();
