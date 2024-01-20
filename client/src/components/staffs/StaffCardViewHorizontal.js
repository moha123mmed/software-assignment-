import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function StaffCardViewHorizontal() {
	const [staffs, setStaffs] = useState([]);
	useEffect(function () {
		async function getStaffs() {
			try {
				const response = await axios.get("/api/staffs");
				setStaffs(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getStaffs();
	}, []);
	return (
		<div className="container">
			<h2>
				Staff - Row Card View
				<p>
					<Link to="/staffs/new" className="btn btn-primary">
						Create staff
					</Link>
				</p>
			</h2>
			<hr />
			{staffs.map((staff) => {
				return (
					<div
						className="card mb-3"
						style={{ maxWidth: "800px" }}
						key={staff._id}
					>
						<div className="row g-0">
							<div className="col-md-4 pl-5 ">
								<h5>Logo</h5>
							</div>
							<div className="col-md-8">
								<div class="card-header">
									<h5 className="card-title">
										<Link to={`/staffs/${staff._id}`} className="link-line">
											{staff.companyName}
										</Link>
									</h5>
								</div>
								<div className="card-body ">
									<h6 className="d-flex align-items-center">
										<i className="bi bi-telephone-fill text-success"></i>
										<a
											className="card-subtitle m-2"
											href={`tel:+${staff.phone}`}
										>
											{staff.phone}
										</a>
									</h6>
									<p className="card-text limit-char">{staff.description}</p>
									<p className="card-text  d-flex align-items-center">
										<i className="bi bi-geo-alt-fill text-warning"></i>
										<small className="text-muted one-liner">
											{staff.location}
										</small>
									</p>
									<div class="card-footer">
										<Link
											to={`/staffs/${staff._id}/edit`}
											className="btn btn-primary"
										>
											Edit
										</Link>
										<span>
											<small>
												<Link to={`/staffs/${staff._id}`} className="link-line">
													Read More...
												</Link>
											</small>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default StaffCardViewHorizontal;