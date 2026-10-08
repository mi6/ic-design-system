import React from "react";
import componentJson from "@ukic/docs";
import canaryComponentJson from "@ukic/canary-docs";
import { IcLink } from "@ukic/react";
import EventTable from "./EventTable";
import MethodTable from "./MethodTable";
import PropTable from "./PropTable";
import SlotTable from "./SlotTable";
import StyleTable from "./StyleTable";

const ComponentDetails: React.FC<{ component: string; canary?: boolean }> = ({
  component,
  canary,
}) => {
  const componentDetailsJson = canary ? canaryComponentJson : componentJson;
  const { components, typeLibrary } = componentDetailsJson;
  const componentDetails = components.find(({ tag }) => tag === component)!;

  const { props, slots, events, methods, styles } = componentDetails;

  return (
    <>
      {canary && (
        <p>
          Canary components are installed from separate packages. See the{" "}
          <IcLink
            href="https://mi6.github.io/ic-ui-kit/branches/canary/develop/react/?path=/docs/getting-started--docs"
            target="_blank"
          >
            Canary React installation guidance
          </IcLink>{" "}
          or the{" "}
          <IcLink
            href="https://mi6.github.io/ic-ui-kit/branches/canary/develop/web-components/?path=/docs/getting-started--docs"
            target="_blank"
          >
            Canary web components installation guidance
          </IcLink>
          .
        </p>
      )}
      {props.length > 0 && (
        <PropTable propData={props} typeLibrary={typeLibrary} />
      )}
      {slots.length > 0 && <SlotTable slotData={slots} />}
      {styles.length > 0 && <StyleTable styleData={styles} />}
      {events.length > 0 && <EventTable eventData={events} />}
      {methods.length > 0 && <MethodTable methodData={methods} />}
    </>
  );
};

export default ComponentDetails;
