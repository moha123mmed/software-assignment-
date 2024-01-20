const Table = require("../models/tableModel");
const table_index = (req, res) => {
	Table.find(function (err, tables) {
		res.json(tables);
	});
};
const table_create_post = (req, res) => {
	let table = new Table(req.body);
	table
		.save()
		.then((table) => {
			res.send(table);
		})
		.catch(function (err) {
			res.status(422).send("Table add failed");
		});
};
const table_details = (req, res) => {
	Table.findById(req.params.id, function (err, table) {
		if (!table) {
			res.status(404).send("No result found");
		} else {
			res.json(table);
		}
	});
};
const table_update = (req, res) => {
	Table.findByIdAndUpdate(req.params.id, req.body)
		.then(function () {
			res.json("Table updated");
		})
		.catch(function (err) {
			res.status(422).send("Table update failed.");
		});
};
const table_delete = (req, res) => {
	Table.findById(req.params.id, function (err, table) {
		if (!table) {
			res.status(404).send("Table not found");
		} else {
			Table.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Table deleted");
				})
				.catch(function (err) {
					res.status(400).send("Table delete failed.");
				});
		}
	});
};
module.exports = {
	table_index,
	table_details,
	table_create_post,
	table_update,
	table_delete,
};