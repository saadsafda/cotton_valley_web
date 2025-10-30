"use client";
import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { RiCheckboxCircleFill, RiPhoneFill, RiMailFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Btn from "@/elements/buttons/Btn";

const RegisterSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="shadow-lg border-0">
              <CardBody className="p-5 text-center">
                {/* Success Icon */}
                <div className="mb-4">
                  <RiCheckboxCircleFill
                    size={80}
                    className="text-success"
                  />
                </div>

                {/* Main Heading */}
                <h2 className="fw-bold mb-3 text-success">
                  Registration Successful!
                </h2>

                {/* Thank You Message */}
                <h4 className="mb-4 text-dark">
                  Thank you for registering with us!
                </h4>

                {/* Description */}
                <p className="text-muted mb-4 fs-5">
                  Your registration has been submitted successfully. Our representative will review your application and contact you shortly.
                </p>

                {/* Info Box */}
                <div className="bg-light rounded p-4 mb-4">
                  <h5 className="fw-bold mb-3">What happens next?</h5>
                  <ul className="list-unstyled text-start mb-0">
                    <li className="mb-2">
                      <RiCheckboxCircleFill className="text-success m-2" />
                      Our team will review your registration details
                    </li>
                    <li className="mb-2">
                      <RiCheckboxCircleFill className="text-success m-2" />
                      We'll verify your business information
                    </li>
                    <li className="mb-2">
                      <RiCheckboxCircleFill className="text-success m-2" />
                      A representative will call you within 24-48 hours
                    </li>
                    <li>
                      <RiCheckboxCircleFill className="text-success m-2" />
                      You'll receive a confirmation email once approved
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="border-top pt-4 mt-4">
                  <p className="text-muted mb-3">
                    If you have any questions, feel free to contact us:
                  </p>
                  <div className="d-flex justify-content-center gap-4 mb-4">
                    <div>
                      <RiPhoneFill className="me-2" />
                      <span>(732) 248 4276</span>
                    </div>
                    <div>
                      <RiMailFill className="me-2" />
                      <span>info@cottonvalley.net</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 justify-content-center mt-4">
                  <Btn
                    className="btn btn-animation btn-md"
                    onClick={() => router.push("/")}
                  >
                    Go to Home
                  </Btn>
                  <Btn
                    className="btn btn-outline-primary btn-md"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </Btn>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterSuccessPage;
