import { INIT_NAV_LIST } from "../../constants";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewport } from "@/hooks/viewport";
import { useModalState } from "@/hooks/providers/modalState";

export const MainNav = memo(function MainNav({ className = "" }: { className?: string }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname().replace(`/${language}`, "") || "/";
  const { isTablet } = useViewport();

  const getNavLinkClassName = (url: string): string => (url === pathname ? "!text-blue-600 dark:!text-blue-400" : "!text-black dark:!text-white");

  const { setIsOpenMenuModal } = useModalState();
  const handleNavClick = () => isTablet && setIsOpenMenuModal(false);

  return (
    <nav className={`shrink-0 border-gray-300 lg:border-r ${className}`} aria-label="desktop navigation">
      <ul className="sticky top-16 flex grow flex-col py-4">
        {INIT_NAV_LIST.map(({ icon, full_name, url }) => (
          <li key={full_name} className="w-full">
            <Link
              href={url}
              className={`${getNavLinkClassName(url)} -ml-3 mr-3 flex items-center gap-4 py-3 pl-3 pr-3 text-lg duration-300 hover:!text-blue-600 dark:hover:!text-blue-400`}
              onClick={handleNavClick}
            >
              <div className="scale-125">{icon}</div>
              <div className="mt-0.5">{t(full_name)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});