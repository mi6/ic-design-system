import React from "react";

import Icon from "@mdi/react";
import {
  mdiInbox,
  mdiMagnify,
  mdiHistory,
  mdiHuman,
  mdiCog,
  mdiHelpCircleOutline,
  mdiHome,
  mdiMenu,
  mdiInformationOutline,
  mdiBell,
  mdiFlag,
  mdiTag,
  mdiBookmark,
  mdiBookmarkOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiCommentText,
  mdiPrinter,
  mdiDownload,
  mdiUpload,
  mdiAttachment,
  mdiShareVariant,
  mdiPlus,
  mdiDelete,
  mdiUndo,
  mdiFloppy,
  mdiDrag,
  mdiClock,
  mdiAccount,
  mdiMapMarker,
  mdiCommentMultiple,
  mdiEmail,
  mdiChartLine,
  mdiCodeBraces,
  mdiCalendarRange,
  mdiLink,
  mdiFolder,
  mdiFile,
  mdiTranslate,
  mdiTranscribe,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiChevronUp,
  mdiChevronDown,
  mdiDotsVertical,
  mdiRefresh,
  mdiAccountGroup,
  mdiLock,
  mdiLockOpenOutline,
  mdiCancel,
  mdiArrowLeft,
  mdiArrowRight,
  mdiChevronLeft,
  mdiChevronRight,
  mdiLaunch,
  mdiCheckCircle,
  mdiAlert,
  mdiHelpCircle,
  mdiInformation,
  mdiImage,
  mdiPencil,
  mdiMagnifyPlusOutline,
  mdiMagnifyMinusOutline,
  mdiArrowUp,
  mdiArrowDown,
  mdiCloseCircle,
  mdiClose,
  mdiMenuDown,
  mdiMenuUp,
  mdiCheck,
  mdiMinus,
  mdiResizeBottomRight,
} from "@mdi/js";

import { IconGroup } from "../../../../../sharedTypes";

const ICON_SIZE = 1;

const iconList: IconGroup[] = [
  {
    title: "Top level navigation",
    id: "toplevel",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiInbox} />,
        name: "Inbox",
        library: "mdiInbox",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMagnify} />,
        name: "Search",
        library: "mdiMagnify",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHistory} />,
        name: "History",
        library: "mdiHistory",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHuman} />,
        name: "Accessibility",
        library: "mdiHuman",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCog} />,
        name: "Settings",
        library: "mdiCog",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHelpCircleOutline} />,
        name: "Help",
        library: "mdiHelpCircleOutline",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHome} />,
        name: "Home",
        library: "mdiHome",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMenu} />,
        name: "Menu",
        library: "mdiMenu",
      },
    ],
  },
  {
    title: "Status",
    id: "status",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiCheckCircle} color="#00703C" />,
        name: "Success",
        library: "mdiCheckCircle",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiAlert} color="#D07932" />,
        name: "Warning",
        library: "mdiAlert",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCloseCircle} color="#D4351C" />,
        name: "Error",
        library: "mdiCloseCircle",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiInformation} color="#3170C2" />,
        name: "Information",
        library: "mdiInformation",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHelpCircle} color="#6C7580" />,
        name: "Unknown",
        library: "mdiHelpCircle",
      },
    ],
  },
  {
    title: "Metadata",
    id: "meta",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiInformationOutline} />,
        name: "Info",
        library: "mdiInformationOutline",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiBell} />,
        name: "Notifications",
        library: "mdiBell",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCommentText} />,
        name: "Comment",
        library: "mdiCommentText",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiFlag} />,
        name: "Flag",
        library: "mdiFlag",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiTag} />,
        name: "Tag",
        library: "mdiTag",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiImage} />,
        name: "Placeholder",
        library: "mdiImage",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiBookmark} />,
        name: "Bookmark (on)",
        library: "mdiBookmark",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiBookmarkOutline} />,
        name: "Bookmark (off)",
        library: "mdiBookmarkOutline",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHeart} />,
        name: "Favourite (on)",
        library: "mdiHeart",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiHeartOutline} />,
        name: "Favourite (off)",
        library: "mdiHeartOutline",
      },
    ],
  },
  {
    title: "Import/Export",
    id: "imex",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiPrinter} />,
        name: "Print",
        library: "mdiPrinter",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiShareVariant} />,
        name: "Share",
        library: "mdiShareVariant",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiDownload} />,
        name: "Download",
        library: "mdiDownload",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiUpload} />,
        name: "Upload",
        library: "mdiUpload",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiAttachment} />,
        name: "Attach",
        library: "mdiAttachment",
      },
    ],
  },
  {
    title: "CRUD",
    id: "crud",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiPlus} />,
        name: "Add",
        library: "mdiPlus",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiPencil} />,
        name: "Edit",
        library: "mdiPencil",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiDelete} />,
        name: "Delete",
        library: "mdiDelete",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiUndo} />,
        name: "Undo",
        library: "mdiUndo",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiFloppy} />,
        name: "Save",
        library: "mdiFloppy",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiDrag} />,
        name: "Drag indicator",
        library: "mdiDrag",
      },
    ],
  },
  {
    title: "Content",
    id: "content",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiClock} />,
        name: "Time",
        library: "mdiClock",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiAccount} />,
        name: "Person",
        library: "mdiAccount",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMapMarker} />,
        name: "Place",
        library: "mdiMapMarker",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCommentMultiple} />,
        name: "Question answer",
        library: "mdiCommentMultiple",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiEmail} />,
        name: "Email",
        library: "mdiEmail",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiChartLine} />,
        name: "Data visualisation",
        library: "mdiChartLine",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCodeBraces} />,
        name: "Code",
        library: "mdiCodeBraces",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCalendarRange} />,
        name: "Date range",
        library: "mdiCalendarRange",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiLink} />,
        name: "Link",
        library: "mdiLink",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiFolder} />,
        name: "Folder",
        library: "mdiFolder",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiFile} />,
        name: "File",
        library: "mdiFile",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiTranslate} />,
        name: "Translate",
        library: "mdiTranslate",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiTranscribe} />,
        name: "Transcribe",
        library: "mdiTranscribe",
      },
    ],
  },
  {
    title: "Actions",
    id: "actions",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiFullscreen} />,
        name: "Fullscreen",
        library: "mdiFullscreen",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiFullscreenExit} />,
        name: "Fullscreen exit",
        library: "mdiFullscreenExit",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMagnifyPlusOutline} />,
        name: "Zoom in",
        library: "mdiMagnifyPlus",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMagnifyMinusOutline} />,
        name: "Zoom out",
        library: "mdiMagnifyMinus",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiChevronUp} />,
        name: "Expand",
        library: "mdiChevronUp",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiChevronDown} />,
        name: "Collapse",
        library: "mdiChevronDown",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiDotsVertical} />,
        name: "More vert",
        library: "mdiDotsVertical",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiRefresh} />,
        name: "Refresh",
        library: "mdiRefresh",
      },
    ],
  },
  {
    title: "Access control",
    id: "ac",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiAccount} />,
        name: "User",
        library: "mdiAccount",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiAccountGroup} />,
        name: "User group",
        library: "mdiAccountGroup",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCancel} />,
        name: "Restrict",
        library: "mdiCancel",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiLock} />,
        name: "Lock(ed)",
        library: "mdiLock",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiLockOpenOutline} />,
        name: "Unlock(ed)",
        library: "mdiLockOpenOutline",
      },
    ],
  },
  {
    title: "Navigation controls",
    id: "nav",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiArrowLeft} />,
        name: "Back",
        library: "mdiArrowLeft",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiArrowRight} />,
        name: "Forward",
        library: "mdiArrowRight",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiArrowUp} />,
        name: "Up",
        library: "mdiArrowUp",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiArrowDown} />,
        name: "Down",
        library: "mdiArrowDown",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiChevronLeft} />,
        name: "Scroll left",
        library: "mdiChevronLeft",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiChevronRight} />,
        name: "Scroll right",
        library: "mdiChevronRight",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiClose} />,
        name: "Clear",
        library: "mdiClose",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCloseCircle} />,
        name: "Cancel",
        library: "mdiCloseCircle",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiLaunch} />,
        name: "New window",
        library: "mdiLaunch",
      },
    ],
  },
  {
    title: "Forms",
    id: "forms",
    icons: [
      {
        icon: <Icon size={ICON_SIZE} path={mdiMenuDown} />,
        name: "Dropdown (open)",
        library: "mdiMenuDown",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMenuUp} />,
        name: "Dropdown (close)",
        library: "mdiMenuUp",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiCheck} />,
        name: "Check",
        library: "mdiCheck",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiMinus} />,
        name: "Indeterminate",
        library: "mdiMinus",
      },
      {
        icon: <Icon size={ICON_SIZE} path={mdiResizeBottomRight} />,
        name: "Resize",
        library: "mdiResizeBottomRight",
      },
    ],
  },
];

export default iconList;
