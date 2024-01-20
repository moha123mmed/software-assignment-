import React from "react";
import "./cssFiles/homepage.css";
function SHome() {
	return (
<body id="page-top"  style={{ backgroundImage: `linear-gradient(to right, rgba(2, 0, 36, 0.90), rgba(0, 0, 0, 0.9))` }}  >
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
<div className="h-10 d-flex align-items-center justify-content-center">
<div class="shadow p-3 mb-5 bg-body rounded">   
  <div class="card text-white bg-dark" style={{maxWidth: "30"}} >
        <header class="masthead bg-dark text-white text-center">
            <div class="container d-flex align-items-center flex-column">
                <h1 class="masthead-heading text-uppercase mb-0">Staff Home</h1>
                <br />
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <p class="masthead-subheading font-weight-light mb-0">Staff Login And Signup</p>
                <br />
                <br />
                <br />
                <br />
            </div>
        </header>
        <section class="page-section bg-dark text-white mb-0" id="about">
            <div class="container">
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <div class="row">
                    <div class="col-lg-4 ms-auto"><p class="lead"> Staff Signup</p>    <a href="ssignup"><button class="btn btn-light" >Staff Register</button></a>
         </div>
                    <div class="col-lg-4 me-auto"><p class="lead">  Staff Login</p><a href="slogin"><button class="btn btn-light" >Staff Login</button></a></div>
                </div>
            </div>
        </section>
    </div>
  </div>
  </div>


  <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    </body>
	);
}
export default SHome;
