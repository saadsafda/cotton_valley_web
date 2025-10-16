import { useContext, useState } from "react";
import Link from "next/link";
import { RiDownload2Fill, RiRefreshLine } from "react-icons/ri";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import PayNowModal from "./PayNowModal";

const DetailTitle = ({ params, data, handleReorder, reOrderLoading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const [modal, setModal] = useState(false);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <>
      <div className="title-header">
        <div className="d-flex align-items-center flex-wrap gap-2">
          <h5>{`${t("OrderNumber")}: #${params}`}</h5>
          <div className="right-option">
            {/* {data?.payment_status === "FAILED" && (
              <a
                className="btn btn-md fw-bold text-light theme-bg-color"
                onClick={() => setModal(true)}
              >
                {t("PayNow")}
                <RiRefreshLine className="ms-2" />
              </a>
            )} */}
            {data?.invoice_url &&
              data?.payment_status &&
              data?.payment_status === "COMPLETED" && (
                <Link
                  href={data?.invoice_url}
                  className="btn btn-md fw-bold text-light theme-bg-color ms-auto"
                >
                  {t("Invoice")} <RiDownload2Fill className="ms-2" />
                </Link>
              )}
          </div>
          <button
            className="reorder-btn btn btn-secondary"
            onClick={handleReorder}
            disabled={!data?.products?.length || reOrderLoading}
          >
            {reOrderLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <RiRefreshLine /> {" "} Reorder
              </>
            )}
          </button>
        </div>
      </div>
      <PayNowModal modal={modal} setModal={setModal} params={params} />
    </>
  );
};

export default DetailTitle;
