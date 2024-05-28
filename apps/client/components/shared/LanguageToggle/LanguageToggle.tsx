import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LanguageToggle = () => {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  );

  return (
    <div>
      <ul>
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router;
          return (
            <li key={locale}>
              <Link
                href={{ pathname, query }}
                as={asPath}
                locale={locale}
                legacyBehavior
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(LanguageToggle);
