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
                    console.log(result);
                    db.Article.create(result)
                        .then(function(dbArticle) {
                            console.log(dbArticle);
                        })
                        .catch(function(err){
                            return res.json(err);
                        });
                }

            });

            res.send("Scrape Complete");
        }
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