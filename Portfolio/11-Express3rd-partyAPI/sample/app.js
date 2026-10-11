import https from "https";
import bodyParser from "body-parser";
import axios from "axios";
import FormData from "form-data";
import express from "express";
import fs from "fs";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./");

var city_name = undefined;
const file = fs.readFileSync("./index.html", "utf-8");
// https get
app.get("/", (req, res) => {
  return res.send(file);
});
app.post("/", (req, res, next) => {
  city_name = req.body.cityName;
  if (!city_name) return res.send(file);
  // I desactivated de apikey
  const API_key = "9f961da3de40ba595a0b4458888a5761";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;
  let weatherDescription;
  let temp;

  https
    .get(url, (response) => {
      console.log(response.statusCode);
      if (response.statusCode != 200)
        return next(Error("An error has ocurred"));
      let body = "";
      response.on("data", (data) => {
        body = body + data;
      });
      response.on("end", () => {
        let jsonResp;
        try {
          jsonResp = JSON.parse(body);
        } catch (err) {
          return next(Error("Bad response from server "));
        }
        weatherDescription = jsonResp.weather[0].description;
        temp = jsonResp.main.temp;
        const icon = jsonResp.weather[0].icon;
        if (!icon) return next(Error("Icon not found"));
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.render("./response", {
          city_name,
          temp,
          weatherDescription,
          iconUrl,
          error: undefined,
        });
      });
    })
    .on("error", () => res.send("error"));
});

// https post
app.get("/dictionary", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  const options = {
    method: "POST",
    headers: form_data.getHeaders(),
  };
  var soapRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      response
        .on("data", (data) => {
          var jsonResp = JSON.parse(data);
          console.log(jsonResp);
          res.send("Success");
        })
        .on("error", (e) => {
          res.send("Error ${e.message}");
        });
    } else {
      res.send("Error");
    }
  });
  form_data.pipe(soapRequest);
});

// axios post
app.get("/temp", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  axios
    .post(url, form_data, { headers: form_data.getHeaders() })
    .then((response) => {
      var data = response.data;
      console.log(data);
      if (!data.hasOwnProperty("error")) {
        console.log("no error");
        res.send("Success");
      } else {
        console.log("Fail");
        res.send("Fail");
      }
    })
    .catch((err) => {
      console.log(err.code + ": " + err.message);
      console.log(err.stack);
      res.send("Fail error");
    });
});
app.use((err, req, res, next) => {
  return res.status(500).render("./response", { error: err.message });
});
app.listen(3000, () => {
  console.log("Listening to port 3000");
  console.log("http://localhost:3000/");
});
