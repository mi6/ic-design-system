import React, { useState } from "react";
import clsx from "clsx";

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
    <ic-typography variant="h3" data-class="heading">
      <h5>{title} Icons</h5>
    </ic-typography>
    <div className="panel">
      {icons.map((icon) => (
        <span key={icon.name} className="icon">
          {icon.icon}
          <ic-typography variant="label" data-class="icon-label">
            {icon.name}
          </ic-typography>
          <ic-typography variant="caption" data-class="icon-caption">
            {icon.library}
          </ic-typography>
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
  <ic-link
    onClick={() => setCurrentPanel(id)}
    href={`#${id}`}
    aria-expanded={currentPanel === id ? "true" : "false"}
    aria-controls={`#${currentPanel}`}
    title={`Click to show icons to be used for "${title}"`}
  >
    {title}
  </ic-link>
);

const IconFinder: React.FC = () => {
  const [currentPanel, setCurrentPanel] = useState(iconList[0].id);
  return (
    <div className="icons-container">
      <div className="icon-group-links">
        <ic-typography variant="h4">Icon groups</ic-typography>
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
