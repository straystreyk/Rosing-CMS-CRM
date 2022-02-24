import { Form } from "./form";
import { UserList } from "./user-list";
import { ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { IconProps } from "../../constants/icons";

const resource = "admin_users";

const Icon = ({ color }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="path-1-outside-1_1718_30975"
      maskUnits="userSpaceOnUse"
      x="1"
      y="2.5"
      width="18"
      height="15"
      fill="black"
    >
      <rect fill="white" x="1" y="2.5" width="18" height="15" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.94455 10.4376C5.68454 11.1418 6.6655 11.5358 7.6867 11.5358C8.70745 11.5344 9.68756 11.14 10.4272 10.4361C11.6187 11.3105 12.3296 12.7099 12.3272 14.2055V15.4459H3.04717V14.2055C3.04347 12.7094 3.75463 11.3106 4.94455 10.4376ZM4.28359 9.61775C3.90186 8.99093 3.69507 8.26514 3.69507 7.51784C3.69507 6.45229 4.11558 5.43026 4.86422 4.67683C5.61273 3.92327 6.6281 3.5 7.6867 3.5C8.74542 3.5 9.76066 3.92327 10.5093 4.67683C11.051 5.22207 11.4209 5.908 11.584 6.64929C12.1521 6.12669 12.8953 5.83551 13.6682 5.83643C14.4864 5.83729 15.2707 6.16546 15.8485 6.74878C16.4262 7.33199 16.7501 8.1224 16.7487 8.94591C16.7472 9.48188 16.6083 10.0032 16.3515 10.4621C17.3864 11.2814 18.0002 12.5385 18.0002 13.8795V15.183C18.0002 15.3228 17.945 15.4569 17.8468 15.5557C17.7485 15.6546 17.6154 15.7099 17.4765 15.7099H13.4223C13.4062 15.7099 13.3902 15.7092 13.3744 15.7077V15.9728C13.3744 16.1126 13.3192 16.2467 13.2211 16.3456C13.1229 16.4443 12.9897 16.4999 12.8509 16.4999L12.8511 16.4999H2.52354C2.38475 16.4999 2.25156 16.4444 2.1533 16.3456C2.05518 16.2467 2.00002 16.1127 2.00002 15.9729V14.2055C1.99722 13.2325 2.24218 12.275 2.71151 11.4243C3.10292 10.715 3.63943 10.0995 4.28359 9.61775ZM13.3744 14.658C13.3902 14.6565 13.4062 14.6558 13.4223 14.6558H16.9529V13.8793C16.9548 12.8569 16.4862 11.898 15.6953 11.2752C15.135 11.7692 14.414 12.0442 13.6647 12.045V12.045C13.4093 12.045 13.1573 12.0131 12.9138 11.9516C13.2185 12.6652 13.376 13.4356 13.3744 14.216V14.658ZM5.60469 5.42226C6.15694 4.86638 6.9058 4.55413 7.6867 4.55413C8.46734 4.55511 9.21573 4.8676 9.76774 5.42323C10.3197 5.97886 10.6303 6.73216 10.6312 7.51794C10.6312 8.30396 10.321 9.05786 9.76883 9.61362C9.21658 10.1695 8.46772 10.4817 7.6867 10.4817C6.9058 10.4817 6.15694 10.1695 5.60469 9.61362C5.05244 9.05786 4.74223 8.30396 4.74223 7.51794C4.74223 6.73191 5.05244 5.97814 5.60469 5.42226ZM13.6647 6.89218C13.1247 6.89218 12.6068 7.10799 12.2249 7.49217C11.8428 7.87648 11.6282 8.39766 11.6278 8.94117C11.6275 9.48478 11.8416 10.0062 12.2232 10.3909C12.6048 10.7756 13.1224 10.992 13.6624 10.9926C14.2023 10.9932 14.7205 10.7779 15.1029 10.3942C15.4853 10.0104 15.7007 9.48946 15.7015 8.94585C15.702 8.40161 15.4877 7.87958 15.1057 7.4944C14.7237 7.10925 14.2054 6.89256 13.6647 6.89222L13.6647 6.89218Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.94455 10.4376C5.68454 11.1418 6.6655 11.5358 7.6867 11.5358C8.70745 11.5344 9.68756 11.14 10.4272 10.4361C11.6187 11.3105 12.3296 12.7099 12.3272 14.2055V15.4459H3.04717V14.2055C3.04347 12.7094 3.75463 11.3106 4.94455 10.4376ZM4.28359 9.61775C3.90186 8.99093 3.69507 8.26514 3.69507 7.51784C3.69507 6.45229 4.11558 5.43026 4.86422 4.67683C5.61273 3.92327 6.6281 3.5 7.6867 3.5C8.74542 3.5 9.76066 3.92327 10.5093 4.67683C11.051 5.22207 11.4209 5.908 11.584 6.64929C12.1521 6.12669 12.8953 5.83551 13.6682 5.83643C14.4864 5.83729 15.2707 6.16546 15.8485 6.74878C16.4262 7.33199 16.7501 8.1224 16.7487 8.94591C16.7472 9.48188 16.6083 10.0032 16.3515 10.4621C17.3864 11.2814 18.0002 12.5385 18.0002 13.8795V15.183C18.0002 15.3228 17.945 15.4569 17.8468 15.5557C17.7485 15.6546 17.6154 15.7099 17.4765 15.7099H13.4223C13.4062 15.7099 13.3902 15.7092 13.3744 15.7077V15.9728C13.3744 16.1126 13.3192 16.2467 13.2211 16.3456C13.1229 16.4443 12.9897 16.4999 12.8509 16.4999L12.8511 16.4999H2.52354C2.38475 16.4999 2.25156 16.4444 2.1533 16.3456C2.05518 16.2467 2.00002 16.1127 2.00002 15.9729V14.2055C1.99722 13.2325 2.24218 12.275 2.71151 11.4243C3.10292 10.715 3.63943 10.0995 4.28359 9.61775ZM13.3744 14.658C13.3902 14.6565 13.4062 14.6558 13.4223 14.6558H16.9529V13.8793C16.9548 12.8569 16.4862 11.898 15.6953 11.2752C15.135 11.7692 14.414 12.0442 13.6647 12.045V12.045C13.4093 12.045 13.1573 12.0131 12.9138 11.9516C13.2185 12.6652 13.376 13.4356 13.3744 14.216V14.658ZM5.60469 5.42226C6.15694 4.86638 6.9058 4.55413 7.6867 4.55413C8.46734 4.55511 9.21573 4.8676 9.76774 5.42323C10.3197 5.97886 10.6303 6.73216 10.6312 7.51794C10.6312 8.30396 10.321 9.05786 9.76883 9.61362C9.21658 10.1695 8.46772 10.4817 7.6867 10.4817C6.9058 10.4817 6.15694 10.1695 5.60469 9.61362C5.05244 9.05786 4.74223 8.30396 4.74223 7.51794C4.74223 6.73191 5.05244 5.97814 5.60469 5.42226ZM13.6647 6.89218C13.1247 6.89218 12.6068 7.10799 12.2249 7.49217C11.8428 7.87648 11.6282 8.39766 11.6278 8.94117C11.6275 9.48478 11.8416 10.0062 12.2232 10.3909C12.6048 10.7756 13.1224 10.992 13.6624 10.9926C14.2023 10.9932 14.7205 10.7779 15.1029 10.3942C15.4853 10.0104 15.7007 9.48946 15.7015 8.94585C15.702 8.40161 15.4877 7.87958 15.1057 7.4944C14.7237 7.10925 14.2054 6.89256 13.6647 6.89222L13.6647 6.89218Z"
      fill={color}
    />
    <path
      d="M7.6867 11.5358V11.6558H7.68686L7.6867 11.5358ZM4.94455 10.4376L5.02727 10.3506L4.95453 10.2814L4.87357 10.3408L4.94455 10.4376ZM10.4272 10.4361L10.4982 10.3394L10.4173 10.28L10.3445 10.3492L10.4272 10.4361ZM12.3272 14.2055L12.2072 14.2053V14.2055H12.3272ZM12.3272 15.4459V15.5659H12.4472V15.4459H12.3272ZM3.04717 15.4459H2.92717V15.5659H3.04717V15.4459ZM3.04717 14.2055H3.16717L3.16717 14.2052L3.04717 14.2055ZM4.28359 9.61775L4.35546 9.71385L4.44283 9.64851L4.38608 9.55534L4.28359 9.61775ZM4.86422 4.67683L4.94934 4.76141L4.94935 4.76139L4.86422 4.67683ZM10.5093 4.67683L10.4241 4.7614L10.4241 4.7614L10.5093 4.67683ZM11.584 6.64929L11.4668 6.67507L11.5117 6.87889L11.6653 6.7376L11.584 6.64929ZM13.6682 5.83643L13.668 5.95643H13.6681L13.6682 5.83643ZM15.8485 6.74878L15.9338 6.66434L15.8485 6.74878ZM16.7487 8.94591L16.8687 8.94625V8.94611L16.7487 8.94591ZM16.3515 10.4621L16.2468 10.4035L16.1969 10.4927L16.2771 10.5562L16.3515 10.4621ZM17.8468 15.5557L17.7617 15.471L17.7616 15.4711L17.8468 15.5557ZM13.3744 15.7077L13.3854 15.5882L13.2544 15.5761V15.7077H13.3744ZM13.2211 16.3456L13.3062 16.4302L13.3063 16.4301L13.2211 16.3456ZM12.8509 16.4999V16.3799L12.822 16.6164L12.8509 16.4999ZM12.8511 16.4999V16.6199L12.88 16.3834L12.8511 16.4999ZM2.1533 16.3456L2.06812 16.4302L2.06823 16.4303L2.1533 16.3456ZM2.00002 14.2055H2.12002L2.12002 14.2051L2.00002 14.2055ZM2.71151 11.4243L2.60644 11.3663L2.60644 11.3663L2.71151 11.4243ZM13.3744 14.658H13.2544V14.7896L13.3854 14.7775L13.3744 14.658ZM16.9529 14.6558V14.7758H17.0729V14.6558H16.9529ZM16.9529 13.8793L16.8329 13.8791V13.8793H16.9529ZM15.6953 11.2752L15.7695 11.1809L15.691 11.1191L15.6159 11.1852L15.6953 11.2752ZM13.6647 12.045L13.6645 11.925L13.5447 11.9251V12.045H13.6647ZM13.6647 12.045V12.165H13.7847V12.045H13.6647ZM12.9138 11.9516L12.9432 11.8353L12.7083 11.7759L12.8034 11.9987L12.9138 11.9516ZM13.3744 14.216L13.2544 14.2157V14.216H13.3744ZM7.6867 4.55413L7.68685 4.43413H7.6867V4.55413ZM5.60469 5.42226L5.51956 5.33768L5.60469 5.42226ZM9.76774 5.42323L9.85287 5.33866L9.85287 5.33866L9.76774 5.42323ZM10.6312 7.51794H10.7512V7.51781L10.6312 7.51794ZM9.76883 9.61362L9.85396 9.69819H9.85396L9.76883 9.61362ZM5.60469 9.61362L5.68982 9.52904L5.68981 9.52904L5.60469 9.61362ZM12.2249 7.49217L12.31 7.57677L12.31 7.57677L12.2249 7.49217ZM13.6647 6.89218L13.719 6.78518L13.6934 6.77218H13.6647V6.89218ZM11.6278 8.94117L11.7478 8.94125V8.94125L11.6278 8.94117ZM12.2232 10.3909L12.3084 10.3064L12.3084 10.3064L12.2232 10.3909ZM13.6624 10.9926L13.6622 11.1126H13.6622L13.6624 10.9926ZM15.1029 10.3942L15.1879 10.4789L15.1879 10.4789L15.1029 10.3942ZM15.7015 8.94585L15.8215 8.94603V8.94595L15.7015 8.94585ZM15.1057 7.4944L15.1909 7.40989L15.1909 7.40989L15.1057 7.4944ZM13.6647 6.89222L13.6104 6.99922L13.636 7.0122L13.6646 7.01222L13.6647 6.89222ZM7.6867 11.4158C6.69645 11.4158 5.74506 11.0337 5.02727 10.3506L4.86183 10.5245C5.62401 11.2498 6.63455 11.6558 7.6867 11.6558V11.4158ZM10.3445 10.3492C9.62699 11.032 8.6764 11.4144 7.68653 11.4158L7.68686 11.6558C8.7385 11.6543 9.74812 11.2481 10.51 10.5231L10.3445 10.3492ZM12.4472 14.2057C12.4497 12.6719 11.7206 11.2364 10.4982 10.3394L10.3562 10.5329C11.5168 11.3846 12.2096 12.748 12.2072 14.2053L12.4472 14.2057ZM12.4472 15.4459V14.2055H12.2072V15.4459H12.4472ZM3.04717 15.5659H12.3272V15.3259H3.04717V15.5659ZM2.92717 14.2055V15.4459H3.16717V14.2055H2.92717ZM4.87357 10.3408C3.65272 11.2365 2.92338 12.6714 2.92717 14.2058L3.16717 14.2052C3.16357 12.7474 3.85653 11.3846 5.01553 10.5343L4.87357 10.3408ZM3.57507 7.51784C3.57507 8.2873 3.78799 9.03466 4.1811 9.68017L4.38608 9.55534C4.01573 8.9472 3.81507 8.24298 3.81507 7.51784H3.57507ZM4.77909 4.59224C4.00803 5.36824 3.57507 6.42072 3.57507 7.51784H3.81507C3.81507 6.48386 4.22313 5.49227 4.94934 4.76141L4.77909 4.59224ZM7.6867 3.38C6.59602 3.38 5.55004 3.8161 4.77908 4.59226L4.94935 4.76139C5.67542 4.03044 6.66017 3.62 7.6867 3.62V3.38ZM10.5944 4.59225C9.82335 3.8161 8.7775 3.38 7.6867 3.38V3.62C8.71334 3.62 9.69798 4.03044 10.4241 4.7614L10.5944 4.59225ZM11.7012 6.6235C11.5333 5.86022 11.1523 5.15384 10.5944 4.59225L10.4241 4.7614C10.9496 5.29031 11.3086 5.95578 11.4668 6.67507L11.7012 6.6235ZM13.6683 5.71643C12.8652 5.71547 12.0929 6.01809 11.5028 6.56097L11.6653 6.7376C12.2113 6.2353 12.9255 5.95555 13.668 5.95643L13.6683 5.71643ZM15.9338 6.66434C15.3336 6.05837 14.5187 5.71732 13.6683 5.71643L13.6681 5.95643C14.4542 5.95725 15.2079 6.27254 15.7633 6.83323L15.9338 6.66434ZM16.8687 8.94611C16.8701 8.09101 16.5339 7.27014 15.9338 6.66434L15.7633 6.83323C16.3186 7.39384 16.63 8.15379 16.6287 8.94572L16.8687 8.94611ZM16.4563 10.5207C16.7229 10.0441 16.8672 9.50276 16.8687 8.94625L16.6287 8.94557C16.6273 9.461 16.4936 9.9623 16.2468 10.4035L16.4563 10.5207ZM16.2771 10.5562C17.2831 11.3528 17.8802 12.5752 17.8802 13.8795H18.1202C18.1202 12.5018 17.4896 11.2101 16.426 10.368L16.2771 10.5562ZM17.8802 13.8795V15.183H18.1202V13.8795H17.8802ZM17.8802 15.183C17.8802 15.2913 17.8375 15.3949 17.7617 15.471L17.9318 15.6403C18.0526 15.5189 18.1202 15.3544 18.1202 15.183H17.8802ZM17.7616 15.4711C17.6859 15.5474 17.5834 15.5899 17.4765 15.5899V15.8299C17.6475 15.8299 17.8112 15.7618 17.9319 15.6402L17.7616 15.4711ZM17.4765 15.5899H13.4223V15.8299H17.4765V15.5899ZM13.4223 15.5899C13.4099 15.5899 13.3976 15.5894 13.3854 15.5882L13.3633 15.8272C13.3828 15.829 13.4025 15.8299 13.4223 15.8299V15.5899ZM13.4944 15.9728V15.7077H13.2544V15.9728H13.4944ZM13.3063 16.4301C13.4268 16.3086 13.4944 16.1442 13.4944 15.9728H13.2544C13.2544 16.081 13.2117 16.1847 13.1359 16.2611L13.3063 16.4301ZM12.8509 16.6199C13.0217 16.6199 13.1855 16.5515 13.3062 16.4302L13.136 16.2609C13.0602 16.3372 12.9576 16.3799 12.8509 16.3799V16.6199ZM12.88 16.3834L12.8797 16.3834L12.822 16.6164L12.8223 16.6164L12.88 16.3834ZM2.52354 16.6199H12.8511V16.3799H2.52354V16.6199ZM2.06823 16.4303C2.1889 16.5516 2.35267 16.6199 2.52354 16.6199V16.3799C2.41683 16.3799 2.31421 16.3373 2.23838 16.261L2.06823 16.4303ZM1.88002 15.9729C1.88002 16.1442 1.94762 16.3087 2.06812 16.4302L2.23849 16.2611C2.16274 16.1848 2.12002 16.0811 2.12002 15.9729H1.88002ZM1.88002 14.2055V15.9729H2.12002V14.2055H1.88002ZM2.60644 11.3663C2.12724 12.2349 1.87717 13.2124 1.88002 14.2058L2.12002 14.2051C2.11728 13.2525 2.35711 12.3151 2.81658 11.4823L2.60644 11.3663ZM4.21172 9.52165C3.5539 10.0136 3.00608 10.6421 2.60644 11.3663L2.81658 11.4823C3.19976 10.7878 3.72496 10.1854 4.35546 9.71385L4.21172 9.52165ZM13.3854 14.7775C13.3976 14.7764 13.4099 14.7758 13.4223 14.7758V14.5358C13.4025 14.5358 13.3828 14.5367 13.3633 14.5385L13.3854 14.7775ZM13.4223 14.7758H16.9529V14.5358H13.4223V14.7758ZM17.0729 14.6558V13.8793H16.8329V14.6558H17.0729ZM17.0729 13.8796C17.0748 12.8203 16.5893 11.8265 15.7695 11.1809L15.621 11.3695C16.383 11.9695 16.8347 12.8936 16.8329 13.8791L17.0729 13.8796ZM13.6648 12.165C14.4435 12.1642 15.1926 11.8783 15.7746 11.3652L15.6159 11.1852C15.0774 11.66 14.3845 11.9242 13.6645 11.925L13.6648 12.165ZM13.7847 12.045V12.045H13.5447V12.045H13.7847ZM12.8844 12.0679C13.1374 12.1319 13.3994 12.165 13.6647 12.165V11.925C13.4193 11.925 13.1772 11.8944 12.9432 11.8353L12.8844 12.0679ZM13.4944 14.2162C13.496 13.4196 13.3352 12.633 13.0241 11.9045L12.8034 11.9987C13.1017 12.6973 13.2559 13.4517 13.2544 14.2157L13.4944 14.2162ZM13.4944 14.658V14.216H13.2544V14.658H13.4944ZM7.6867 4.43413C6.87371 4.43413 6.09425 4.75922 5.51956 5.33768L5.68982 5.50683C6.21963 4.97354 6.93788 4.67413 7.6867 4.67413V4.43413ZM9.85287 5.33866C9.27845 4.76047 8.49951 4.43515 7.68685 4.43413L7.68655 4.67413C8.43517 4.67507 9.15302 4.97474 9.68261 5.50781L9.85287 5.33866ZM10.7512 7.51781C10.7503 6.7005 10.4272 5.91681 9.85287 5.33866L9.68261 5.50781C10.2122 6.04091 10.5103 6.76383 10.5112 7.51807L10.7512 7.51781ZM9.85396 9.69819C10.4285 9.11987 10.7512 8.33553 10.7512 7.51794H10.5112C10.5112 8.2724 10.2134 8.99586 9.6837 9.52904L9.85396 9.69819ZM7.6867 10.6017C8.4998 10.6017 9.27926 10.2767 9.85396 9.69819L9.6837 9.52904C9.15389 10.0623 8.43563 10.3617 7.6867 10.3617V10.6017ZM5.51956 9.69819C6.09425 10.2767 6.87371 10.6017 7.6867 10.6017V10.3617C6.93788 10.3617 6.21963 10.0623 5.68982 9.52904L5.51956 9.69819ZM4.62223 7.51794C4.62223 8.33553 4.94489 9.11988 5.51957 9.6982L5.68981 9.52904C5.15999 8.99585 4.86223 8.27239 4.86223 7.51794H4.62223ZM5.51956 5.33768C4.94489 5.91612 4.62223 6.70034 4.62223 7.51794H4.86223C4.86223 6.76349 5.15998 6.04015 5.68982 5.50683L5.51956 5.33768ZM12.31 7.57677C12.6695 7.21517 13.1568 7.01218 13.6647 7.01218V6.77218C13.0927 6.77218 12.5442 7.00081 12.1398 7.40757L12.31 7.57677ZM11.7478 8.94125C11.7482 8.42928 11.9504 7.93852 12.31 7.57677L12.1398 7.40757C11.7353 7.81443 11.5082 8.36603 11.5078 8.9411L11.7478 8.94125ZM12.3084 10.3064C11.9492 9.94428 11.7475 9.45329 11.7478 8.94125L11.5078 8.94109C11.5075 9.51628 11.734 10.0681 12.138 10.4754L12.3084 10.3064ZM13.6625 10.8726C13.1546 10.872 12.6675 10.6685 12.3084 10.3064L12.138 10.4754C12.542 10.8827 13.0902 11.1119 13.6622 11.1126L13.6625 10.8726ZM15.0179 10.3095C14.6579 10.6707 14.1704 10.8732 13.6625 10.8726L13.6622 11.1126C14.2343 11.1133 14.783 10.8851 15.1879 10.4789L15.0179 10.3095ZM15.5815 8.94566C15.5807 9.45769 15.3779 9.94824 15.0179 10.3095L15.1879 10.4789C15.5928 10.0726 15.8206 9.52122 15.8215 8.94603L15.5815 8.94566ZM15.0205 7.5789C15.3801 7.9415 15.582 8.43308 15.5815 8.94574L15.8215 8.94595C15.822 8.37014 15.5953 7.81766 15.1909 7.40989L15.0205 7.5789ZM13.6646 7.01222C14.1732 7.01254 14.6609 7.21635 15.0205 7.57891L15.1909 7.40989C14.7864 7.00215 14.2376 6.77258 13.6648 6.77222L13.6646 7.01222ZM13.6103 6.99918L13.6104 6.99922L13.719 6.78522L13.719 6.78518L13.6103 6.99918Z"
      fill={color}
      mask="url(#path-1-outside-1_1718_30975)"
    />
  </svg>
);

const UserCreate = (props: any) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceCreate>
);

const UserEdit = (props: any) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceEdit>
);

export const UserVariables = {
  create: UserCreate,
  list: UserList,
  edit: UserEdit,
  icon: Icon,
};
