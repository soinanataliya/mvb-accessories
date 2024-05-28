import { memo } from "react";
import { useTranslations } from "next-intl";

export async function getStaticProps(props: { locale: string }) {
  return {
    props: {
      messages: (await import(`../../../messages/${props.locale}.json`))
        .default,
    },
  };
}

const ThemeToggle = () => {
  const changeTheme = () => {
    if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      return;
    }
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  };

  const t = useTranslations("ThemeToggle");

  return (
    <div>
      <button onClick={changeTheme}>{t("button")}</button>
    </div>
  );
};

export default memo(ThemeToggle);
