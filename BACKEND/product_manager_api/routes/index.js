var express = require("express");
var router = express.Router();
require("dotenv").config();

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

/* GET home page. */
router.get("/", function(req, res, next) {});

// api get data from postgresql
router.get("/getdata01", function(req, res, next) {
  pool.query("SELECT * FROM product_info", (err, response) => {
    if (err) {
      console.log("err", err);
    } else {
      res.send(response.rows);
    }
    //pool.end();
  });
});

router.get("/add", function(req, res, next) {
  res.render("add", {});
});
router.post("/add", function(req, res, next) {
  product_name = req.body.product_name;
  product_price = req.body.product_price;
  product_link = req.body.product_link;
  pool.query(
    "INSERT INTO product_info (product_name, product_price, image) values ($1,$2,$3)",
    [product_name, product_price, product_link],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send("successful" + product_name + product_price + product_link);
      }
    }
  );
});

module.exports = router;
