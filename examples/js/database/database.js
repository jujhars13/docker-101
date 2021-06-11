/**
 * Plain Rest Web api with database example
 * Nodejs > 16
 */
const redis = require("async-redis");
const MongoClient = require("mongodb").MongoClient;

// Mongo Connection example
var url = `mongodb+srv://${process.env.MONGO_HOST}:27017/PageCount`;

const db = MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log(`Database created! at ${process.env.MONGO_HOST}:27017`);
  db.close();
});

// Redis connection example
const client = redis.createClient(
  process.env?.REDIS_PORT ? process.env.REDIS_PORT : 6379,
  process.env?.REDIS_HOST ? process.env.REDIS_HOST : "localhost"
);
client.on("error", function (error) {
  console.error("redis connection error", error);
  throw error;
});

const http = require("http");
const {
  port = 8080,
  yourName = "Themba",
  environment = "development",
} = process.env;

const requestHandler = (request, response) => {
  const out = { message: "A Friendly JSON REST API", environment, yourName };

  // have a "healthcheck" route that can be used to check service health
  if (request.url === "/healthcheck" && request.method === "GET") {
    out.message = "ok";
    out.status = 200;
  }

  // log access to redis
  client.incr("pageVisits");

  // "log" server access to stdout
  console.log(
    `${new Date()} [${request?.connection?.remoteAddress}]-[${
      request?.headers?.["user-agent"]
    }] ${yourName} accessed ${request.url} [${environment}]`
  );

  return client
    .get("pageVisits")
    .then((pageCount) => {
      // send output as json
      //save to mongodb
      const obj = {
        count: pageCount,
      };
      db.collection("count").insertOne(obj, function (err, res) {
        if (err) throw err;
        console.log("what is the result? ", res);
        console.log("Page count saved? " + res.insertedCount);
        db.close();
      });
      console.log(pageCount);
      out.pageCounts = pageCount;
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      response.end(JSON.stringify(out));
    })
    .catch((err) => {
      console.log("redis read error", err);
    });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  console.log(
    `${environment} server listening on ${port}. Healthcheck on /healthcheck`
  );
});
