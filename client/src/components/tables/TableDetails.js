import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
function TableDetails(props) {
	const [table, setTable] = useState({});
	const { _id } = useParams();
	const navigate = useNavigate();
	useEffect(
		function () {
			async function getTableById() {
				try {
					const response = await axios.get(`/api/tables/${_id}`);
					setTable(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			getTableById();
		},
		[props]
	);
	async function handleDelete() {
		try {
			await axios.delete(`/api/tables/${_id}`);
			navigate("/tables");
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div className="container">
			<h2>{table.TableId}</h2>
			<p>
				<b>Is the Table Reserved?</b>:
				{table.isReserved === true ? 'Yes, the table is reserved' : 'The table is not reserved'}
			</p>
			<p>
				<b>Table Capacity</b>: {table.TableCapacity}
			</p>
			<p>
				<small>
					<b>ID</b>: {table._id}
				</small>
			</p>
			<div className="btn-group ">
				<Link to={`/tables/${table._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/tables" className="btn btn-secondary">
					Close
				</Link>
			</div>
			<hr />
		</div>
	);
}
export default TableDetails;