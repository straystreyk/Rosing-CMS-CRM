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
    top: 48,
    zIndex: 10,
    width: "100%",
    backgroundColor: "#fff",
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.md})`]: {
      maxWidth: "calc(100vw - 48px)",
    },
  },
  FormTab: {
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 16,
    textTransform: "none",
    "&:last-child": {
      marginRight: 0,
    },
  },
  FormTabWrapper: {
    borderBottom: "1px solid #E7E9E9",
    margin: "0 -20px",
    padding: "0 20px",
    backgroundColor: "#fff",
    height: 48,
    "& .MuiTabs-flexContainer": {
      overflow: "visible",
      alignItems: "center",
    },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.md})`]: {
      maxWidth: "calc(100vw - 48px)",
    },
  },
});

const useFormTabs = ({
  tabRef,
  fixed,
  setFixed,
}: {
  tabRef: React.RefObject<HTMLDivElement>;
  fixed: boolean;
  setFixed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const scrollToSection = (label: string) => {
    const element = document.getElementById(label);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 110;
      if (top !== 0) {
        window.scrollTo({ top });
      }
    }
  };
  const checkTabPosition = React.useCallback(() => {
    if (
      tabRef.current &&
      tabRef.current.getBoundingClientRect().top < tabRef.current.offsetHeight &&
      !fixed
    ) {
      setFixed(true);
    } else if (
      tabRef.current &&
      tabRef.current.getBoundingClientRect().top >= tabRef.current.offsetHeight &&
      fixed
    ) {
      setFixed(false);
    }
  }, [fixed]);
  return { scrollToSection, checkTabPosition };
};

export const FormTabs: React.FC<FormTabProps> = React.memo(({ labels, children }) => {
  const [value, setValue] = React.useState(0);
  const [fixed, setFixed] = React.useState(false);
  const tabRef = React.useRef<HTMLDivElement>(null);
  const { scrollToSection, checkTabPosition } = useFormTabs({ tabRef, fixed, setFixed });

  const classes = useStyles();

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

  return (
    <div ref={tabRef} className={classes.FormTabWrapper}>
      <Box className={cn(fixed && classes.FixedTabsActive)}>
        <Tabs
          value={value}
          onChange={(e, newValue: number) => setValue(newValue)}
          scrollButtons="auto"
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
