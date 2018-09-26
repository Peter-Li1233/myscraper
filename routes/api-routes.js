// *********************************************************************************
// article-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our  models
var db = require("../models");
// Requiring request package;
var request =require("request");
// Requiring cheerio package;
var cheerio = require("cheerio");
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Articles from website
  app.get("/scrape", function(req, res) {
    request({
        url: "https://www.nytimes.com/section/technology"
    }, 
    (err,response,body) => {
        if(!err && response.statusCode == 200) {
            var results = [];
            var $ = cheerio.load(body);

            //Now, We grap the headline, link and summary from the body, do the following:
            $("article .story-body").each(function(i,element) {
                var result = {};
                result.headline = $(this)
                    .children("h2")
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("h2")
                    .children("a")
                    .attr("href");
                result.summary = $(this)
                    .children(".summary")
                    .text();
                
                if(result.headline || result.link || result.summary) {
                    results.push(result);
                    console.log(result);
                }

            });

            res.json(results);
        }
    });
  });

  //POST route for saving an article
  app.post("/save", function(req, res) {
        db.Article.create(req.body)
            .then(function(dbArticle) {
                console.log(dbArticle);
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
              });
  });
  // Get route for getting all the articles from database
  app.get("/api/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticles) {
            res.json(dbArticles);
        })
        .catch(function(err){
            res.json(err);
        });
  });

};