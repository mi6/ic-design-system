import React from "react";

import "./index.css";
import { IcAccordion, IcAccordionGroup } from "@ukic/react";
import iconList from "../IconList";
import { Icon } from "../../../../../sharedTypes";

interface IconGroupProps {
  icons: Icon[];
  id: string;
}

const IconGroup: React.FC<IconGroupProps> = ({ icons, id }) => (
  <div id={`#${id}`}>
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

const IconFinder: React.FC = () => (
  <IcAccordionGroup label="Icon Groups">
    {iconList.map((grp) => (
      <IcAccordion heading={grp.title}>
        <IconGroup icons={grp.icons} id={grp.id} key={grp.id} />
      </IcAccordion>
    ))}
  </IcAccordionGroup>
);

export default IconFinder;
