"use client";
import Avatar from "@/components/common/Avatar";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SettingContext from "@/helper/settingContext";
import { useRouter } from "next/navigation";

const InvoiceDetailsTable = ({ data }) => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { convertCurrency } = useContext(SettingContext);

  const handleRowClick = (product) => {
    const productSlug = product?.product_id;
    if (productSlug) {
      router.push(`/${i18Lang}/product/${productSlug}`);
    }
  };

  return (
    <>
    <h3 className="fw-semibold mb-3">{"Final Delivery"}</h3>
      <Card>
        <CardBody>
          <div className="tracking-wrapper table-responsive">
            <Table className="product-table">
              <thead>
                <tr>
                  <th scope="col">{t("S.No")}</th>
                  <th scope="col">{t("Image")}</th>
                  <th scope="col">{t("Case Pack")}</th>
                  <th scope="col">{t("Name")}</th>
                  <th scope="col">{t("Price")}</th>
                  <th scope="col">{t("Quantity")}</th>
                  <th scope="col">{t("Subtotal")}</th>
                </tr>
              </thead>
              <tbody>
                {data?.invoice?.items?.length > 0
                  ? data?.invoice?.items?.map((product, i) => (
                      <tr
                        key={product?.item_code}
                        onClick={() => handleRowClick(product)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{i + 1}</td>
                        <td className="product-image">
                          <Avatar
                            data={{ original_url: product.image }}
                            name={product?.item_code}
                            customImageClass="img-fluid"
                          />
                        </td>
                        <td>{product?.case_pack}</td>
                        <td
                          style={{
                            overflow: "hidden",
                          }}
                        >
                          <h6>{product?.item_name}</h6>
                        </td>
                        <td>
                          <h6>{convertCurrency(product?.rate)}</h6>
                        </td>
                        <td>
                          <h6>{product?.qty}</h6>
                        </td>
                        <td>
                          <h6>{convertCurrency(product?.amount)}</h6>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <Row>
        <Col xxl={8} lg={12} md={7}></Col>
        <Col xxl={4} lg={12} md={5}>
          <Card className="h-m30">
            <CardBody>
              <h3 className="fw-semibold mb-3">{"summary"}</h3>
              <div className="tracking-total tracking-wrapper">
                <ul>
                  <li>
                    {t("Subtotal")}{" "}
                    <span>
                      {convertCurrency(data?.invoice?.total ? data?.invoice?.total : 0)}
                    </span>
                  </li>
                  {data?.invoice?.discount_amount > 0 &&
                  <li>
                    {t('Discount')} <span>{convertCurrency(data?.invoice?.discount_amount ? data?.invoice?.discount_amount : 0)}</span>
                  </li>
                  }
                  <li>
                    {t("Total")}{" "}
                    <span>
                      {convertCurrency(data?.invoice?.grand_total ? data?.invoice?.grand_total : 0)}
                    </span>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InvoiceDetailsTable;
