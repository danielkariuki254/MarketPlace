import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGem,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaWhatsapp,
} from "react-icons/fa";

export default function App() {
  return (
    <footer className="text-center text-lg-start text-light bg-dark ">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Lets get in touch on social networks:</span>
        </div>

        <div>
          <a
            href="https://www.facebook.com/dan.kariuki.140"
            className="me-4  text-reset"
          >
            <FaFacebookF className="fs-5" />
          </a>
          <a href="https://twitter.com/_Mwenda254" className="me-4 text-reset">
            <FaTwitter className="fs-5" />
          </a>
          <a href="https://wa.me/+254798789477" className="me-4 text-reset">
            <FaWhatsapp className="fs-5" />
          </a>
          <a
            href="https://www.instagram.com/mwenda_k254"
            className="me-4 text-reset"
          >
            <FaInstagram className="fs-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-kariuki-210a0b253"
            className="me-4 text-reset"
          >
            <FaLinkedin className="fs-5" />
          </a>
          <a
            href="https://github.com/danielkariuki254"
            className="me-4 text-reset"
          >
            <FaGithub className="fs-5" />
          </a>
        </div>
      </section>

      <section className="border-bottom">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-decoration-underline">
                <FaGem color="secondary" className="me-3" />
                Mwenda Tech-Solutions
              </h6>
              <p>
                MWENDA Tech Solutions offers web design, web app development,
                and graphic design services. We create stunning digital
                experiences tailored to your needs. Let's bring your vision to
                life!
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-decoration-underline">
                Skills
              </h6>
              <p>React.js</p>
              <p>Node.js</p>
              <p>Express.js</p>
              <p>Grahics Design</p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-decoration-underline">
                Projects
              </h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  MarketPlace
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  PhonePlace
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  PoultyCare
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  CurrencyConverter
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-decoration-underline">
                Contact
              </h6>

              <p>
                <FaHome color="secondary" className="me-3" />
                Embu, Kenya
              </p>
              <p>
                <FaEnvelope color="secondary" className="me-3" />
                dankariuki202@gmail.com
              </p>
              <p>
                <FaPhone color="secondary" className="me-3" /> +254 798 789 477
              </p>
              <a href="https://wa.me/+254798789477">
                <FaWhatsapp className="fs-5 me-3" />
                +254 798 789 477
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4">
        © 2024 Copyright Mwenda Tech-Solutions
      </div>
    </footer>
  );
}
