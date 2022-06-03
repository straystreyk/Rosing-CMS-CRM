import { useCallback, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";
import { setSidebarVisibility } from "react-admin";
import cn from "classnames";

import styles from "./expand-menu.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../types";
import { Collapse, Fade, Tooltip, useMediaQuery } from "@material-ui/core";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../constants/style-constants";

interface ExpandProps {
  links: string[];
  title: string;
  icon?: JSX.Element;
  className?: string;
}

const ArrowIcon = () => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.11125 0.209226C0.875347 -0.0506177 0.472102 -0.0712528 0.210579 0.163136C-0.0509448 0.397526 -0.0717133 0.798181 0.164191 1.05802L3.55304 4.79078C3.8069 5.0704 4.24872 5.06963 4.5016 4.78913L7.8373 1.08896C8.07229 0.828297 8.05011 0.427717 7.78776 0.194239C7.52541 -0.0392398 7.12224 -0.0172026 6.88726 0.24346L4.32096 3.09016C4.16246 3.26597 3.88681 3.26645 3.7277 3.0912L1.11125 0.209226Z"
      fill="white"
    />
  </svg>
);

/**
 * description:
 * custom component, needs to create expand menu
 *
 *  @param links - array of strings (links of children)
 *  @param title - title of expand menu
 *  @param children - react children element
 *  @param icon - svg icon
 *  @param className - others classNames
 */
export const ExpandMenu = ({
  links,
  title,
  children,
  icon,
  className,
}: PropsWithChildren<ExpandProps>) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  const isMobile = useMediaQuery(`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`);
  const expand = useRef<HTMLDivElement>(null);
  const founded = links.filter((el: string) => history.location.pathname.includes(el));
  const [active, setActive] = useState(!!founded.length);
  const toggleClick = useCallback(async () => {
    await dispatch(setSidebarVisibility(true));
    setActive((p) => !p);
  }, [dispatch]);

  const currentExists = !!expand.current;

  useEffect(() => {
    if (!open) setActive(false);
  }, [currentExists, open, founded.length, active]);

  return (
    <Tooltip
      disableHoverListener={open}
      disableFocusListener={open}
      title={title}
      placement="right"
      arrow
    >
      <button
        className={cn(
          active && styles.activeExpand,
          styles.expandWrapper,
          className,
          !open && styles.sidebarClose
        )}
      >
        <button className={styles.expandTitleWrapper} onClick={toggleClick}>
          <span
            className={cn(
              styles.icon,
              !!founded.length && !open && styles.iconActive,
              !open && styles.iconClose
            )}
          >
            {icon}
          </span>
          <span className={styles.iconWrapper}>
            <span>{title}</span>
            {open ? <ArrowIcon /> : ""}
          </span>
        </button>

        <Collapse className={styles.expandSubMenu} in={active} unmountOnExit>
          {children}
        </Collapse>
      </button>
    </Tooltip>
  );
};
