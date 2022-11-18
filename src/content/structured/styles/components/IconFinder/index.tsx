import React, { useState } from "react";
import clsx from "clsx";

import { IcLink, IcTypography } from "@ukic/react";

import "./index.css";
import iconList from "../IconList";
import { Icon } from "../../../../../sharedTypes";

interface IconGroupProps {
  title: string;
  icons: Icon[];
  id: string;
  visible: boolean;
}

interface IconGroupLinkProps {
  title: string;
  id: string;
  setCurrentPanel: Function;
  currentPanel: string;
}

const IconGroup: React.FC<IconGroupProps> = ({ title, icons, id, visible }) => (
  <div id={`#${id}`} className={clsx(!visible && "hidden")}>
    <IcTypography variant="h3" className="heading">
      <h5>{title} Icons</h5>
    </IcTypography>
    <div className="panel">
      {icons.map((icon) => (
        <span key={icon.name} className="icon">
          {icon.icon}
          <IcTypography variant="label" className="icon-label">
            {icon.name}
          </IcTypography>
          <IcTypography variant="caption" className="icon-caption">
            {icon.library}
          </IcTypography>
        </span>
      ))}
    </div>
  </div>
);

const IconGroupLink: React.FC<IconGroupLinkProps> = ({
  title,
  id,
  setCurrentPanel,
  currentPanel,
}) => (
  <IcLink
    className="icon-group-link"
    onClick={() => setCurrentPanel(id)}
    href={`#${id}`}
    aria-expanded={currentPanel === id ? "true" : "false"}
    aria-controls={`#${currentPanel}`}
    title={`Click to show icons to be used for "${title}"`}
  >
    {title}
  </IcLink>
);

const IconFinder: React.FC = () => {
  const [currentPanel, setCurrentPanel] = useState(iconList[0].id);
  return (
    <div className="icons-container">
      <div className="icon-group-links">
        <IcTypography variant="h4" className="icon-groups-title">
          Icon groups
        </IcTypography>
        {iconList.map((grp) => (
          <IconGroupLink
            title={grp.title}
            id={grp.id}
            setCurrentPanel={setCurrentPanel}
            currentPanel={currentPanel}
          />
        ))}
      </div>
      <div className="panel-container">
        {iconList.map((grp) => (
          <IconGroup
            title={grp.title}
            icons={grp.icons}
            id={grp.id}
            visible={currentPanel === grp.id}
          />
        ))}
      </div>
    </div>
  );
};

export default IconFinder;
