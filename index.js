const Twit = require('twit')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var appf = firebase.initializeApp({ apiKey: "AIzaSyDF3lqZQbjs-xEBl7QpO9TYooS2oEfeoXE",
authDomain: "tweet-rstats.firebaseapp.com",
databaseURL: "https://tweet-rstats-default-rtdb.firebaseio.com",
projectId: "tweet-rstats",
storageBucket: "tweet-rstats.appspot.com",
messagingSenderId: "1038502402572",
appId: "1:1038502402572:web:e0a69efb06b8eefdbeec29",
measurementId: "G-H6QZE6547L"});

const apikey = 'AQTBQGS01OPlJOr1poBM5LHYW'
const apiSecretKey = 'BAecP5fg8nnKmxxz4v5PJCXIT7ng4Y1OFzqOphV5BpSf07zLoT'
const accessToken = '1271766871964962817-FqjNzVvUDd7Rwylx9PmWeqUEpVOnhy'
const accessTokenSecret = 'LcdmVuG0rj7z9XaNtH5IoLqt9XKgi6dsbgtuStgXHUVs7'

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});
var today = new Date();
              var dd= String(today.getDate()).padStart(2,'0');
              var tdd= String(today.getDate()+1).padStart(2,'0');
              var ydd= String(today.getDate()-1).padStart(2,'0');
              var mm = String(today.getMonth() +1).padStart(2,'0');
              var yyyy= today.getFullYear();
              today=yyyy+'-'+mm+'-'+dd;
              serdat=yyyy+mm+ydd;
              tomorrow=yyyy+'-'+mm+'-'+tdd;
              yesterday=yyyy+'-'+mm+'-'+ydd;
var paramsq={
             q: `#rstats since:${yesterday}`, 
              until:`${today}`, 
              count: 100
}

/*function retry(paramsq){
 T.get('search/tweets', paramsq, function(err, data, response) {
     if(data){
     const tweets = data
     const tweetsstats=tweets.statuses
     console.log(tweets.search_metadata.count);
     for(i=0;i<tweets.statuses.length;i++)
         {
              console.log(tweetsstats[i].id + tweetsstats[i].text + tweetsstats[i].created_At + tweetsstats[i].user.name )
             console.log(i);
         }
     }
     else{
         retry(paramsq);
     }
    
 })
}*/


function recurtweet(paramst){
    T.get('search/tweets', paramst, function(err, data, response) {
        if(err){
          console.log('err', err);
}
        if(data){
      const tweets = data
      const tweetsstats=tweets.statuses
      
      for(i=0;i<tweetsstats.length;i++)
         {
             var kpliref = firebase.database().ref(`tweets/${serdat}/${tweetsstats[i].id}`);
      var data={
        date:yesterday,
        id:tweetsstats[i].id,
        text:tweetsstats[i].text,
        created_at:tweetsstats[i].created_at,
        username:tweetsstats[i].user.name
   }
       kpliref.set(data)
              //console.log(tweetsstats[i].id + tweetsstats[i].text + tweetsstats[i].created_At + tweetsstats[i].user.name )
             //console.log(i);
         }
      
    
      
      console.log(tweets.search_metadata);
      if(tweets.search_metadata.next_results!=null){
       var nurl=`https://twitter.com${tweets.search_metadata.next_results}`;
      console.log(nurl);
      var rurl= new URL(nurl);
      var nextr=rurl.searchParams.get("max_id");
      console.log(nextr);
          var paramst={
              q: `#rstats since:${yesterday}`, 
              until:`${today}`, 
              count: 100,
              max_id:nextr
          }
          recurtweet(paramst);
      }
        else{
            console.log("finished");
             process.exit();
        }
        }
    
    }    )}

    // //1. GET RECENT TWEETS

  T.get('search/tweets',paramsq, function(err, data, response) {
      if(err){
          console.log('err', err);
}
      if(data){
     //.map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
     // .map(tweet => tweet.text)
     // .filter(tweet => tweet.toLowerCase().includes('elon'));
      const tweets = data
      const tweetsstats=tweets.statuses
      
            for(i=0;i<tweetsstats.length;i++)
         {
             var kpliref = firebase.database().ref(`tweets/${serdat}/${tweetsstats[i].id}`);
      var data={
        date:yesterday,
        id:tweetsstats[i].id,
        text:tweetsstats[i].text,
        created_at:tweetsstats[i].created_at,
        username:tweetsstats[i].user.name
   }
       kpliref.set(data)
              //console.log(tweetsstats[i].id + tweetsstats[i].text + tweetsstats[i].created_At + tweetsstats[i].user.name )
             //console.log(i);
         }
      console.log(tweets.search_metadata);
      if(tweets.search_metadata.next_results!=null){
       var nurl=`https://twitter.com${tweets.search_metadata.next_results}`;
      console.log(nurl);
      var rurl= new URL(nurl);
      var nextr=rurl.searchParams.get("max_id");
      console.log(nextr);
          var paramst={ 
              q: `#rstats since:${yesterday}`, 
              until:`${today}`, 
              count: 100,
              max_id:nextr
          }
          recurtweet(paramst);
      }
      else{
            console.log("finished");
          process.exit();
        }
    
     
          
  }
    })



    // //2. REAL TIME MONITORING USING STREAM (HASHTAG)
    // var stream = T.stream('statuses/filter', { track: '#tesla' })
    // stream.on('tweet', function (tweet) {
    //     console.log(tweet.text);
    //     console.log('Language: ' + franc(tweet.text));
    //     console.log('------');
    // AAAAAAAAAAAAAAAAAAAAADVnNQEAAAAAYcqWSGflueeZWEvEyC7A5V28ByM%3DCTG97hkkD9sEOe5sZBOjZZP7iCbVuxbZV5uuFEH5wCkj2XLyCE }) */


