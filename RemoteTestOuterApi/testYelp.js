var request = require("request");
const tokenId = "CMRyLRonKGva6JT4Bw2XpP6o06puY00H0c0Hs1_YKXxaTG-bZvGu1AcXGREfGOLDEtgdyjUOV8XNBlMRmVljGEpUl5VwinEySC0u12r-x8q8g78yCUjpQMVF4hPnW3Yx" 
var testJson = {
      "Cuisine":"Chinese",  
      "People":"3",
      "Dates":"2018-11-20",
      "Time":"19:00:00",
      "Location":"New York",
      "Phone":"6464686948"
};
var Time = new Date(testJson.Dates + " "+testJson.Time);
// console.log(Time.getTime());
// console.log(Time.toLocaleString());
var options = { method: 'GET',
  url: 'https://api.yelp.com/v3/businesses/search',
  qs: { location: testJson.Location,
      term: testJson.Cuisine,
    limit: 4},
  headers: 
   { 'cache-control': 'no-cache',
     'authorization':  'Bearer ' + tokenId
  }
 };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var suggestions = JSON.parse(body).businesses[0];
  console.log("response size = " + suggestions.length);
  console.log(JSON.stringify(suggestions));

  var loc = "";
  for(let i = 0; i < suggestions.location.display_address.length; i ++){
    loc += suggestions.location.display_address[i];
  }
  var msgTosend = "You have booked the " + testJson.Cuisine +  " Cuisine: " 
  + suggestions.name + ", at " + loc + " for " 
  + testJson.People + " people. Enjoy your meal!";
  console.log(msgTosend);
});
