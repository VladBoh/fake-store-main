import { useTranslation } from "react-i18next";

export const AboutUsForm = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="text-gray-800 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("About us")}</h1>
        <p>{t("description1")}</p>
        <p>{t("description2")}</p>
      </div>
    </section>
  );
};
