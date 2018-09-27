
// html Routes
// =============================================================
module.exports = function(app) {
    app.get("/", function(req,res) {
        res.render("index");
    });

    app.get("/articleComment.html", function(req,res) {
        res.render("articleComment");
    }); 
};
