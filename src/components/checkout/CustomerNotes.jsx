import { useContext } from "react";
import { Field } from "formik";
import { Label, Input } from "reactstrap";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { RiStickyNoteLine } from "react-icons/ri";

const CustomerNotes = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  return (
    <li>
      <div className="checkout-icon">
        <RiStickyNoteLine />
      </div>
      <div className="checkout-box">
        <div className="checkout-title">
          <h4>{t("CustomerNotes")}</h4>
        </div>
        <div className="checkout-detail">
          <div className="row g-4">
            <div className="col-12">
              <Label htmlFor="customer_notes" className="form-label">
                {t("OrderNotes")} <span className="text-muted">({t("Optional")})</span>
              </Label>
              <Field name="customer_notes">
                {({ field }) => (
                  <Input
                    {...field}
                    type="textarea"
                    id="notes"
                    rows="4"
                    placeholder={t("Notes About Your Order")}
                    className="form-control"
                    value={values.notes || ""}
                    onChange={(e) => setFieldValue("notes", e.target.value)}
                  />
                )}
              </Field>
              <small className="text-muted d-block mt-2">
                {t("NotesPlaceholder")}
              </small>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CustomerNotes;
