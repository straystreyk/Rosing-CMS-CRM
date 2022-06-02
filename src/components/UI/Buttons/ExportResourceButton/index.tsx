import * as React from "react";
import { StandardButton } from "../standard-button";
import { ArrayInputItemArrow } from "../../../../constants/icons";
import { Box, CircularProgress, Menu, MenuItem, Typography } from "@material-ui/core";
import { authClient } from "../../../Providers/AuthProvider/client";
import { gql, useSubscription } from "@apollo/client";

const SUBSCRIBE_TO_EXPORT = gql`
  subscription {
    data: exportTaskAdded {
      exportTask {
        progress
        file
      }
    }
  }
`;

const ExportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="path-1-outside-1_1631_401215"
      maskUnits="userSpaceOnUse"
      x="3.44238"
      y="1.01312"
      width="13"
      height="14"
      fill="black"
    >
      <rect fill="white" x="3.44238" y="1.01312" width="13" height="14" />
      <path d="M12.4871 2.01312L7.53646 2.01312C7.19486 2.01312 6.91763 2.25315 6.91763 2.54892L6.91763 8.44268H5.06114C4.82356 8.44268 4.60629 8.5606 4.50363 8.74646C4.40031 8.93183 4.42932 9.15262 4.5785 9.31336L9.52914 14.6713C9.646 14.7983 9.82363 14.8722 10.0118 14.8722C10.1999 14.8722 10.3775 14.7983 10.4951 14.6713L15.4457 9.31336C15.5942 9.15262 15.6233 8.93245 15.5206 8.74646C15.4173 8.5606 15.2 8.44268 14.9624 8.44268H13.1059L13.1059 2.54892C13.1059 2.25315 12.8287 2.01312 12.4871 2.01312H12.4871ZM13.6746 9.51427L10.0119 13.4786L6.34909 9.51427H7.5366C7.8782 9.51427 8.15543 9.27424 8.15543 8.97848L8.15543 3.08472H11.8684V8.97848C11.8684 9.27424 12.1456 9.51427 12.4872 9.51427L13.6746 9.51427Z" />
    </mask>
    <path
      d="M12.4871 2.01312L7.53646 2.01312C7.19486 2.01312 6.91763 2.25315 6.91763 2.54892L6.91763 8.44268H5.06114C4.82356 8.44268 4.60629 8.5606 4.50363 8.74646C4.40031 8.93183 4.42932 9.15262 4.5785 9.31336L9.52914 14.6713C9.646 14.7983 9.82363 14.8722 10.0118 14.8722C10.1999 14.8722 10.3775 14.7983 10.4951 14.6713L15.4457 9.31336C15.5942 9.15262 15.6233 8.93245 15.5206 8.74646C15.4173 8.5606 15.2 8.44268 14.9624 8.44268H13.1059L13.1059 2.54892C13.1059 2.25315 12.8287 2.01312 12.4871 2.01312H12.4871ZM13.6746 9.51427L10.0119 13.4786L6.34909 9.51427H7.5366C7.8782 9.51427 8.15543 9.27424 8.15543 8.97848L8.15543 3.08472H11.8684V8.97848C11.8684 9.27424 12.1456 9.51427 12.4872 9.51427L13.6746 9.51427Z"
      fill="#005AA3"
    />
    <path
      d="M6.91763 8.44268V8.47268H6.94763V8.44268H6.91763ZM4.50363 8.74646L4.52984 8.76106L4.52989 8.76096L4.50363 8.74646ZM4.5785 9.31336L4.60053 9.293L4.60049 9.29295L4.5785 9.31336ZM9.52914 14.6713L9.55121 14.651L9.55117 14.651L9.52914 14.6713ZM10.4951 14.6713L10.5171 14.6917L10.5171 14.6917L10.4951 14.6713ZM15.4457 9.31336L15.4677 9.33372L15.4677 9.33372L15.4457 9.31336ZM15.5206 8.74646L15.5468 8.73195L15.5468 8.73188L15.5206 8.74646ZM13.1059 8.44268H13.0759V8.47268H13.1059V8.44268ZM13.6746 9.51427L13.6966 9.53463L13.7432 9.48427H13.6746V9.51427ZM10.0119 13.4786L9.98982 13.4989L10.0119 13.5228L10.0339 13.4989L10.0119 13.4786ZM6.34909 9.51427V9.48427H6.28052L6.32705 9.53463L6.34909 9.51427ZM8.15543 3.08472V3.05472H8.12543V3.08472H8.15543ZM11.8684 3.08472H11.8984V3.05472H11.8684V3.08472ZM12.4871 1.98312L7.53646 1.98312V2.04312L12.4871 2.04312V1.98312ZM7.53646 1.98312C7.1825 1.98312 6.88763 2.23267 6.88763 2.54892H6.94763C6.94763 2.27363 7.20723 2.04312 7.53646 2.04312V1.98312ZM6.88763 2.54892L6.88763 8.44268H6.94763L6.94763 2.54892H6.88763ZM6.91763 8.41268H5.06114V8.47268H6.91763V8.41268ZM5.06114 8.41268C4.81429 8.41268 4.58606 8.53517 4.47737 8.73195L4.52989 8.76096C4.62651 8.58603 4.83282 8.47268 5.06114 8.47268V8.41268ZM4.47743 8.73185C4.36751 8.92906 4.39887 9.16392 4.55651 9.33377L4.60049 9.29295C4.45976 9.14133 4.43311 8.9346 4.52984 8.76106L4.47743 8.73185ZM4.55647 9.33372L9.5071 14.6917L9.55117 14.651L4.60053 9.293L4.55647 9.33372ZM9.50706 14.6916C9.63015 14.8254 9.81609 14.9022 10.0118 14.9022V14.8422C9.83117 14.8422 9.66184 14.7712 9.55121 14.651L9.50706 14.6916ZM10.0118 14.9022C10.2074 14.9022 10.3934 14.8254 10.5171 14.6917L10.4731 14.6509C10.3617 14.7713 10.1923 14.8422 10.0118 14.8422V14.9022ZM10.5171 14.6917L15.4677 9.33372L15.4237 9.293L10.473 14.651L10.5171 14.6917ZM15.4677 9.33372C15.6246 9.16388 15.6561 8.92973 15.5468 8.73195L15.4943 8.76097C15.5906 8.93518 15.5638 9.14136 15.4237 9.293L15.4677 9.33372ZM15.5468 8.73188C15.4374 8.53518 15.2093 8.41268 14.9624 8.41268V8.47268C15.1907 8.47268 15.3971 8.58602 15.4944 8.76103L15.5468 8.73188ZM14.9624 8.41268H13.1059V8.47268H14.9624V8.41268ZM13.1359 8.44268L13.1359 2.54892H13.0759L13.0759 8.44268H13.1359ZM13.1359 2.54892C13.1359 2.23267 12.841 1.98312 12.4871 1.98312V2.04312C12.8163 2.04312 13.0759 2.27363 13.0759 2.54892H13.1359ZM12.4871 2.04312H12.4871V1.98312H12.4871V2.04312ZM13.6526 9.49391L9.98982 13.4582L10.0339 13.4989L13.6966 9.53463L13.6526 9.49391ZM10.0339 13.4582L6.37112 9.49391L6.32705 9.53463L9.98982 13.4989L10.0339 13.4582ZM6.34909 9.54427H7.5366V9.48427H6.34909V9.54427ZM7.5366 9.54427C7.89057 9.54427 8.18543 9.29472 8.18543 8.97848H8.12543C8.12543 9.25376 7.86584 9.48427 7.5366 9.48427V9.54427ZM8.18543 8.97848L8.18543 3.08472H8.12543L8.12543 8.97848H8.18543ZM8.15543 3.11472H11.8684V3.05472H8.15543V3.11472ZM11.8384 3.08472V8.97848H11.8984V3.08472H11.8384ZM11.8384 8.97848C11.8384 9.29472 12.1333 9.54427 12.4872 9.54427V9.48427C12.158 9.48427 11.8984 9.25376 11.8984 8.97848H11.8384ZM12.4872 9.54427L13.6746 9.54427V9.48427L12.4872 9.48427V9.54427Z"
      fill="#005AA3"
      mask="url(#path-1-outside-1_1631_401215)"
    />
    <path
      d="M2.5 17.337C2.5 17.2541 2.56716 17.187 2.65 17.187L17.35 17.187C17.4328 17.187 17.5 17.2541 17.5 17.337C17.5 17.4198 17.4328 17.487 17.35 17.487L2.65 17.487C2.56716 17.487 2.5 17.4198 2.5 17.337Z"
      fill="#005AA3"
      stroke="#005AA3"
    />
  </svg>
);

export const ExportResourceButton: React.FC<{ resource: string }> = ({ resource }) => {
  const { data } = useSubscription(SUBSCRIBE_TO_EXPORT, {
    client: authClient,
    variables: {},
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (data && data.data.exportTask.progress === 100) {
      setIsLoading(false);
    }
    if (data && data.data.exportTask.progress !== 100) {
      setIsLoading(true);
    }
  }, [data]);

  const handleItem = React.useCallback(async () => {
    const mutation = gql`
      mutation exportMovie {
        exportMovie {
          __typename
        }
      }
    `;

    try {
      setIsLoading(true);
      await authClient.mutate({
        mutation,
        variables: {},
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <StandardButton
        onClick={handleClick}
        variant="icon"
        customColor="var(--primary-text-default)"
      >
        <ExportIcon />
        <ArrayInputItemArrow color="var(--primary-text-default)" />
      </StandardButton>
      <Menu
        id="download-basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "download-basic-button",
        }}
      >
        <MenuItem disabled={isLoading} onClick={handleItem}>
          {data && data.data.exportTask.progress !== 100 ? (
            <Box position="relative" display="inline-flex">
              <CircularProgress variant="determinate" value={data.data.exportTask.progress} />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption" component="div" color="textSecondary">
                  {data.data.exportTask.progress}%
                </Typography>
              </Box>
            </Box>
          ) : null}
          {data && data.data.exportTask.progress === 100 ? (
            <a target="_blank" href={data.data.exportTask.file}>
              Download file
            </a>
          ) : null}
          {!data ? "Take the data (づ ◕‿◕ )づ" : null}
        </MenuItem>
      </Menu>
    </>
  );
};
