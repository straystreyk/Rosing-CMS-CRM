import * as React from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../constants/style-constants";

interface FormTabProps {
  labels: string[];
}

const useStyles = makeStyles({
  FixedTabsActive: {
    position: "fixed",
    top: 65,
    zIndex: 10,
    width: "100%",
    backgroundColor: "#fff",
    borderBottom: "1px solid var(--secondary-color-disable)",
    padding: "0 24px",
    margin: "0 -24px",
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
      left: 0,
      "& .MuiTabs-root": {
        padding: "0 24px",
      },
    },
  },
  FormTab: {
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 16,
    textTransform: "none",
    "&.MuiTab-root": {
      opacity: 1,
      color: "var(--secondary-color-default)",
      transition: "0.35s color ease",
      "&.Mui-selected": {
        color: "var(--secondary-color-main)",
      },
      "&:hover": {
        color: "var(--secondary-color-main)",
      },
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  FormTabWrapper: {
    borderBottom: "1px solid var(--secondary-color-disable)",
    margin: "0 -20px",
    padding: "0 20px",
    backgroundColor: "#fff",
    height: 48,
    "& .MuiTabs-flexContainer": {
      overflow: "visible",
      alignItems: "center",
    },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
      maxWidth: "calc(100vw - 48px)",
    },
  },
});

const useFormTabs = ({
  tabRef,
  fixed,
  setFixed,
  labels,
}: {
  tabRef: React.RefObject<HTMLDivElement>;
  fixed: boolean;
  setFixed: React.Dispatch<React.SetStateAction<boolean>>;
  labels: string[];
}) => {
  const [value, setValue] = React.useState(0);

  const scrollToSection = (label: string) => {
    const element = document.getElementById(label);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 127;
      if (top !== 0) {
        window.scrollTo({ top });
      }
    }
  };

  const checkTabPosition = React.useCallback(() => {
    if (
      tabRef.current &&
      tabRef.current.getBoundingClientRect().top < tabRef.current.offsetHeight + 17 &&
      !fixed
    ) {
      setFixed(true);
    } else if (
      tabRef.current &&
      tabRef.current.getBoundingClientRect().top >= tabRef.current.offsetHeight + 17 &&
      fixed
    ) {
      setFixed(false);
    }
  }, [fixed, setFixed, tabRef]);

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setValue(labels.indexOf(entry.target.id));
      });
    },
    { threshold: 0, rootMargin: "-20% 0% -80% 0%" }
  );

  React.useEffect(() => {
    window.addEventListener("scroll", checkTabPosition);

    labels.forEach((el) => {
      const current = document.getElementById(el);
      if (current) observer.observe(current);
    });

    return function cleanup() {
      window.removeEventListener("scroll", checkTabPosition);
    };
  }, [tabRef, checkTabPosition]);

  return { scrollToSection, value, setValue };
};

export const FormTabs: React.FC<FormTabProps> = React.memo(({ labels, children }) => {
  const [fixed, setFixed] = React.useState(false);
  const tabRef = React.useRef<HTMLDivElement>(null);
  const { scrollToSection, value, setValue } = useFormTabs({ tabRef, fixed, setFixed, labels });
  const classes = useStyles();

  return (
    <div ref={tabRef} className={classes.FormTabWrapper}>
      <Box className={cn(fixed && classes.FixedTabsActive)}>
        <Tabs
          value={value}
          onChange={(e, newValue: number) => setValue(newValue)}
          variant="scrollable"
          scrollButtons="off"
        >
          {labels.map((label: string, index: number) => {
            return (
              <Tab
                className={classes.FormTab}
                label={label}
                key={label + index}
                onClick={() => scrollToSection(label)}
              />
            );
          })}
          {children}
        </Tabs>
      </Box>
    </div>
  );
});
