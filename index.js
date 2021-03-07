const Twit = require("twit");
const notifier = require("node-notifier");
const open = require("open");
const franc = require("franc");

//firebase credentilas
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var appf = firebase.initializeApp({
    apiKey: "AIzaSyDF3lqZQbjs-xEBl7QpO9TYooS2oEfeoXE",
    authDomain: "tweet-rstats.firebaseapp.com",
    databaseURL: "https://tweet-rstats-default-rtdb.firebaseio.com",
    projectId: "tweet-rstats",
    storageBucket: "tweet-rstats.appspot.com",
    messagingSenderId: "1038502402572",
    appId: "1:1038502402572:web:e0a69efb06b8eefdbeec29",
    measurementId: "G-H6QZE6547L",
});

//startegy to tackle error status code:429(twitter rate limit error)
var cv = 200;
var dv = 200;

//Twitter api credentials
const apikey = "AQTBQGS01OPlJOr1poBM5LHYW";
const apiSecretKey = "BAecP5fg8nnKmxxz4v5PJCXIT7ng4Y1OFzqOphV5BpSf07zLoT";
const accessToken = "1271766871964962817-FqjNzVvUDd7Rwylx9PmWeqUEpVOnhy";
const accessTokenSecret = "LcdmVuG0rj7z9XaNtH5IoLqt9XKgi6dsbgtuStgXHUVs7";

var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
});

//Date Calculation
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var tdd = String(today.getDate() + 1).padStart(2, "0");
var ydd = String(today.getDate() - 1).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;
serdat = yyyy + mm + ydd;
tomorrow = yyyy + "-" + mm + "-" + tdd;
yesterday = yyyy + "-" + mm + "-" + ydd;
var paramsq = {
    q: `#rstats since:${yesterday}`,
    until: `${today}`,
    count: 100,
};

retry(paramsq); // This function will start fetching tweets

function recurtweet(paramst) {
    T.get("search/tweets", paramst, function (err, data, response) {
        if (err) {
            console.log("err", err);
        }
        if (data) {
            const tweets = data;
            const tweetsstats = tweets.statuses;
            if (tweetsstats) {
                var cv = 200;
                for (i = 0; i < tweetsstats.length; i++) {
                    var kpliref = firebase.database().ref(`tweets/${serdat}/${tweetsstats[i].id}`);
                    var data = {
                        date: yesterday,
                        id: tweetsstats[i].id,
                        text: tweetsstats[i].text,
                        created_at: tweetsstats[i].created_at,
                        username: tweetsstats[i].user.name,
                    };
                    kpliref.set(data);
                }

                console.log(tweets.search_metadata);
                if (tweets.search_metadata.next_results != null) {
                    var nurl = `https://twitter.com${tweets.search_metadata.next_results}`;
                    console.log(nurl);
                    var rurl = new URL(nurl);
                    var nextr = rurl.searchParams.get("max_id");
                    console.log(nextr);
                    var paramst = {
                        q: `#rstats since:${yesterday}`,
                        until: `${today}`,
                        count: 100,
                        max_id: nextr,
                    };
                    recurtweet(paramst);
                } else {
                    console.log("finished");
                    process.exit();
                }
            } else {
                cv = cv * 2;
                setTimeout(function () {
                    recurtweet(paramst);
                }, cv);
            }
        }
    });
}

function retry(paramsq) {
    T.get("search/tweets", paramsq, function (err, data, response) {
        if (err) {
            console.log("err", err);
        }
        if (data) {
            const tweets = data;
            const tweetsstats = tweets.statuses;
            if (tweetsstats) {
                var dv = 200;
                for (i = 0; i < tweetsstats.length; i++) {
                    var kpliref = firebase.database().ref(`tweets/${serdat}/${tweetsstats[i].id}`);
                    var data = {
                        date: yesterday,
                        id: tweetsstats[i].id,
                        text: tweetsstats[i].text,
                        created_at: tweetsstats[i].created_at,
                        username: tweetsstats[i].user.name,
                    };
                    kpliref.set(data);
                }
                console.log(tweets.search_metadata);
                if (tweets.search_metadata.next_results != null) {
                    var nurl = `https://twitter.com${tweets.search_metadata.next_results}`;
                    console.log(nurl);
                    var rurl = new URL(nurl);
                    var nextr = rurl.searchParams.get("max_id");
                    console.log(nextr);
                    var paramst = {
                        q: `#rstats since:${yesterday}`,
                        until: `${today}`,
                        count: 100,
                        max_id: nextr,
                    };
                    recurtweet(paramst);
                } else {
                    console.log("finished");
                    process.exit();
                }
            } else {
                dv = dv * 2;
                setTimeout(function () {
                    retry(paramsq);
                }, dv);
            }
        }
    });
}
