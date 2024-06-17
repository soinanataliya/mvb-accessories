import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./LanguageToggle.module.css";

const LanguageToggle = () => {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  return (
    <div>
      {locales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <span
            key={locale}
            className={`${styles.languageWrapper} ${locale === activeLocale && styles.active}`}
          >
            <Link
              href={{ pathname, query }}
              as={asPath}
              locale={locale}
              legacyBehavior
            >
              {locale.toUpperCase()}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default memo(LanguageToggle);
