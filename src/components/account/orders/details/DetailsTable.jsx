'use client';
import Avatar from "@/components/common/Avatar";
import { Card, CardBody, Table } from "reactstrap";
import { placeHolderImage } from "../../../../data/CommonPath";
import { useContext, useState } from "react";
import RefundModal from "./RefundModal";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SettingContext from "@/helper/settingContext";
import { useRouter } from "next/navigation";

const DetailsTable = ({ data }) => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [modal, setModal] = useState("");
  const [storeData, setStoreData] = useState("");
  const { convertCurrency } = useContext(SettingContext);
  
  const onModalOpen = (product) => {
    setStoreData(product);
    setModal(product?.id);
  };

  const handleRowClick = (product) => {
    const productSlug = product?.product_id;
    if (productSlug) {
      router.push(`/${i18Lang}/product/${productSlug}`);
    }
  };

  
  return (
    <>
      <Card>
        <CardBody>
          <div className="tracking-wrapper table-responsive">
            <Table className="product-table">
              <thead>
                <tr>
                  <th scope="col">{t("Image")}</th>
                  <th scope="col">{t("Name")}</th>
                  <th scope="col">{t("Price")}</th>
                  <th scope="col">{t("Quantity")}</th>
                  <th scope="col">{t("Subtotal")}</th>
                  <th scope="col">{t("RefundStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.length > 0
                  ? data?.products?.map((product, i) => (
                      <tr 
                        key={i}
                        onClick={() => handleRowClick(product)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="product-image">
                          <Avatar
                            data={
                              product?.product_thumbnail || placeHolderImage
                            }
                            name={product?.name}
                            customImageClass="img-fluid"
                          />
                        </td>
                        <td
                          style={{
                            overflow: "hidden",
                          }}
                        >
                          <h6>{product?.name}</h6>
                        </td>
                        <td>
                          <h6>{convertCurrency(product?.price)}</h6>
                        </td>
                        <td>
                          <h6>{product?.quantity}</h6>
                        </td>
                        <td>
                          <h6>{convertCurrency(product?.sub_total)}</h6>
                        </td>
                        <td>
                          {product?.is_return === 1 &&
                          product?.is_refunded === 0 ? (
                            <a onClick={(e) => {
                              e.stopPropagation();
                              onModalOpen(product);
                            }}>
                              {t("AskForRefund")}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <RefundModal modal={modal} setModal={setModal} storeData={storeData} />
    </>
  );
};

export default DetailsTable;
