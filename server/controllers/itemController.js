const Item = require("../models/itemModel");
const multer = require("multer");
const fs = require("fs");
const item_index = (req, res) => {
	Item.find(function (err, items) {
	  if (err) {
		res.status(500).send("Error retrieving items");
	  } else {
		const itemsWithImages = items.map((item) => {
		  return {
			...item._doc,
			image: {
			  data: item.image.data.toString("base64"), 
			  contentType: item.image.contentType, 
			},
		  };
		});
		res.json(itemsWithImages);
	  }
	});
  };
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});
const upload = multer({ storage: storage }).single("image"); 
const item_create_post = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: "Image upload error" });
    } else if (err) {
      return res.status(500).json({ error: "Unknown error occurred" });
    }
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      image: {
        data: fs.readFileSync(req.file.path), 
        contentType: req.file.mimetype, 
      },
    });
    item
      .save()
      .then((item) => {
        res.send(item);
      })
      .catch((err) => {
        res.status(422).send("Item adding failed");
      });
  });
};
const item_details = (req, res) => {
	Item.findById(req.params.id, function (err, item) {
		if (!item) {
			res.status(404).send("No result found");
		} else {
			res.json(item);
		}
	});
};
const item_update = (req, res) => {
	upload(req, res, function (err) {
	  if (err instanceof multer.MulterError) {
		return res.status(500).json({ error: "Image upload error" });
	  } else if (err) {
		return res.status(500).json({ error: "Unknown error occurred" });
	  }
  	  const itemId = req.params.id;
  	  const updatedItem = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		quantity: req.body.quantity,
	  };
  	  if (req.file) {
		updatedItem.image = {
		  data: fs.readFileSync(req.file.path),
		  contentType: req.file.mimetype,
		};
	  }
  	  Item.findByIdAndUpdate(itemId, updatedItem)
		.then(() => {
		  res.json("Item updated");
		})
		.catch((err) => {
		  res.status(422).send("Item update failed.");
		});
	});
  };
const item_delete = (req, res) => {
	Item.findById(req.params.id, function (err, item) {
		if (!item) {
			res.status(404).send("Item not found");
		} else {
			Item.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Item deleted");
				})
				.catch(function (err) {
					res.status(400).send("Item delete failed.");
				});
		}
	});
};
module.exports = {
	item_index,
	item_details,
	item_create_post,
	item_update,
	item_delete,
};