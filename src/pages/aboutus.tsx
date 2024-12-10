import { useTranslation } from "react-i18next";
import { AboutUsForm } from "@/components/aboutus/aboutus-form";
import { Button } from "@/components/ui/button";

export const AboutUsPage = () => {
  const { i18n } = useTranslation();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button onClick={() => i18n.changeLanguage("en")}>En</Button>
          <Button onClick={() => i18n.changeLanguage("uk")}>Uk</Button>
        </div>
      </div>
      <AboutUsForm />
    </div>
  );
};
