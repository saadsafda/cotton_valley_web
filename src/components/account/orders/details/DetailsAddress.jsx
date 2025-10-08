import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const DetailsAddress = ({ data }) => {
  return (
    <Row className="g-3">
      {/* Shipping Address Card */}
      <Col md={6}>
        <Card>
          <CardBody>
            <h3 className='fw-semibold mb-3'>Shipping Address</h3>
            {data?.shipping_address_id ? (
              <>
                <p className="mb-2">{data?.shipping_address_details}</p>
                <p className="mb-2">
                  {data?.shipping_state && `${data?.shipping_state}, `}
                  {data?.shipping_zip_code}
                </p>
                <p className="mb-2">{data?.shipping_country}</p>
              </>
            ) : (
              <p className="text-muted">No shipping address available</p>
            )}
          </CardBody>
        </Card>
      </Col>

      {/* Billing Address Card */}
      <Col md={6}>
        <Card>
          <CardBody>
            <h3 className='fw-semibold mb-3'>Billing Address</h3>
            {data?.billing_address_id ? (
              <>
                <p className="mb-2">{data?.billing_address_details}</p>
                <p className="mb-2">
                  {data?.billing_state && `${data?.billing_state}, `}
                  {data?.billing_zip_code}
                </p>
                <p className="mb-2">{data?.billing_country}</p>
                {data?.billing_phone && (
                  <p className="mb-0"><strong>Phone:</strong> {data?.billing_phone}</p>
                )}
              </>
            ) : (
              <p className="text-muted">No billing address available</p>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsAddress;
