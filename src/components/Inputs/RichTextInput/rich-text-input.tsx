import * as React from "react";
import { default as RichTextInputDefault } from "ra-input-rich-text";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";
import { InputProps } from "ra-core";
import { TextInputShow } from "../StandatdInputs/TextInput/show-view";
import { icons } from "./icons";

const useStyles = makeStyles({
  RaRichTextInput: {
    color: "var(--primary-text-default)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "8px 0px",
    "& label": labelStyles,
    "& .ql-editor": {
      padding: "8px 12px 50px 12px",
      border: "1px solid var(--secondary-color-default)",
      fontSize: 14,
      borderRadius: 4,
      transition: "0.35s border-color ease",
      "&:hover": {
        borderColor: "var(--primary-text-default)",
      },
      "&:focus": {
        outline: "2px solid #7FC5FF",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& .ql-container.ql-snow": {
      border: "none",
    },
    "& .ql-toolbar.ql-snow": {
      order: 2,
      padding: "8px 0px",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      border: "none",
      borderTop: "1px solid var(--secondary-color-disable)",
      margin: "0px 1px 1px 1px",
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 2,
      "&:after": {
        content: "unset",
      },
    },
    "& .MuiFormHelperText-root": {
      display: "none",
    },
    "& .ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button": {
      padding: 0,
      height: 15,
      width: 15,
      marginLeft: 17,
      "& svg": {
        width: "100%",
      },
      "&.ql-active svg path": {
        fill: "var(--accent-color)",
      },
    },
  },
});

const TOOLBAR_CONTAINER = [
  ["bold", "italic", "strike", { list: "bullet" }, { list: "ordered" }, "code-block"],
  ["image"],
];

export const RichTextInputOrigin: React.FC<{
  label?: string;
  inputType: string;
  source: string;
  helperText?: string;
}> = React.memo(({ source, helperText, ...props }) => {
  const classes = useStyles();

  // needs to override react-admin (quill) default styles
  const configureQuill = React.useCallback(
    (quill: {
      getModule: (module: string) => { controls: [string, HTMLButtonElement][] };
      container: { parentElement: HTMLDivElement };
    }) => {
      const parent = quill.container.parentElement;
      const controls = quill.getModule("toolbar").controls;

      if (controls) {
        controls.forEach((el) => {
          const current = icons.find((icon) =>
            // some icons in quill (like list) got same names
            // but their values are not the same
            el[1].value ? icon.name === el[1].value : icon.name === el[0]
          );
          if (current) el[1].innerHTML = current.icon;
        });
      }

      if (parent) {
        parent.className = classes.RaRichTextInput;
      }
    },
    []
  );

  const loadImage: (input: HTMLInputElement, editor: Element) => void = React.useCallback(
    async (input, editor) => {
      const formData = new FormData();
      if (input.files) {
        formData.append("image", input.files[0]);
        try {
          const res = await fetch(`${window._GLOBALS_.REACT_APP_IMAGE_ENDPOINT}`, {
            method: "POST",
            body: formData,
          });
          const {
            file: { url },
          } = await res.json();
          if (url) {
            editor.innerHTML += `<p><img src=${url} alt="" /></p>`;
          }
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        }
      }
    },
    []
  );

  return (
    <RichTextInputDefault
      {...props}
      configureQuill={configureQuill}
      source={source}
      toolbar={{
        container: TOOLBAR_CONTAINER,
        handlers: {
          image: function () {
            const input = document.createElement("input");
            const quillImage = document.querySelector(".ql-image");
            const editor = document.querySelector(".ql-editor");

            if (input && editor) input.addEventListener("change", () => loadImage(input, editor));

            if (input && quillImage) {
              input.type = "file";
              input.hidden = true;
              if (!quillImage.querySelector("input")) {
                quillImage.append(input);
              }
              input.click();
            }
          },
        },
      }}
      options={{
        theme: "snow",
        placeholder: "",
      }}
      helperText={helperText ?? false}
    />
  );
});

export const RichTextInput: React.FC<InputProps> = React.memo(({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <TextInputShow
      {...rest}
      resource={rest.resource}
      ComponentInput={RichTextInputOrigin}
      source={rest.source}
    />
  ) : (
    <RichTextInputOrigin
      {...rest}
      source={rest.source}
      inputType={inputType}
      helperText={rest.helperText}
    />
  );
});
