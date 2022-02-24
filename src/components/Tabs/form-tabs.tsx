import * as React from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

interface FormTabProps {
  labels: string[];
}

const useStyles = makeStyles({
  FixedTabsActive: {
    position: "fixed",
    top: 48,
    zIndex: 10,
    width: "100%",
  },
  FormTab: {
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 16,
    textTransform: "none",
  },
  FormTabWrapper: {
    borderBottom: "1px solid #E7E9E9",
    margin: "0 -20px",
    padding: "0 20px",
    backgroundColor: "#fff",
  },
});

export const FormTabs: React.FC<FormTabProps> = ({ labels }) => {
  const [value, setValue] = React.useState(0);
  const [fixed, setFixed] = React.useState(false);
  const tabRef = React.useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setValue(labels.indexOf(entry.target.id));
      });
    },
    { threshold: 0, rootMargin: "-20% 0% -80% 0%" }
  );

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
    <div ref={tabRef} style={{ height: tabRef?.current?.offsetHeight }}>
      <Box className={cn(fixed && classes.FixedTabsActive)}>
        <Tabs
          value={value}
          onChange={(e, newValue: number) => setValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          className={classes.FormTabWrapper}
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
        </Tabs>
      </Box>
    </div>
  );
};
