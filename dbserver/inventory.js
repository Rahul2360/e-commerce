// Importing important packages
const express = require('express');

// Using express and routes
const route = express.Router();

// Item Model
let itemModel = require('./item');

// To Get List Of Items
route.route('/getAllItem').get(function (req, res) {
  itemModel.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        "errCode": 0,
        "data": items
      });
    }
  });
});

// To Add New Item
route.route('/addItem').post(function (req, res) {
  let item = new itemModel(req.body);
  item.save()
    .then(data => {
      res.status(200).json({
        "errCode": 0,
        'msg': 'Item Added Successfully',
        "data": data
      });
    })
    .catch(err => {
      res.status(400).json({
        "errCode": 80,
        "msg": "Something Went Wrong",
      });
    });
});

// To Get Item Details By Item ID
route.route('/getItem/:id').get(function (req, res) {
  let id = req.params.id;
  if(id == undefined) {
    res.json({
      'errCode': 2,
      'msg': "Invalid Argument"
    })
  }
  itemModel.find({"id": id}, function (err, item) {
    if(item == undefined) {
      res.json({
        'errCode': 1,
        'data':{},
        'msg': 'Not Found'
      });
    } else {
      res.json({
        'errCode' : 0,
        'data': item
      });
    }
  });
});

// To Update The Item Details
route.route('/updateItem').post(function (req, res) {
  const id = req.body.id
  itemModel.find({_id: id}, function (err, item) {
    if (!item)
      return next(new Error('Unable To Find Item With This Id'));
    else {
      item[0].name = req.body.name;
      item[0].save().then(data => {
        res.json({
          "errCode": 0,
          "msg": 'Item Updated Successfully',
          "data": data
        });
      })
      .catch(err => {
        res.status(400).json({
          "errCode": 90,
          "msg": "Something Went Wrong",
        });
      });
    }
  });
});

// To Delete The Item
route.route('/deleteItem/:id').get(function (req, res) {
  itemModel.findByIdAndRemove({
    _id: req.params.id
  }, function (err, item) {
    if (err) {
      res.status(400).json({
        "errCode": 90,
        "msg": "Something Went Wrong",
      });
    } else  {
      res.json({
        "errCode": 0,
        "msg": 'Item Deleted Successfully',
      });
    }
  });
});

module.exports = route;