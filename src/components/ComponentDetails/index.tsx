import React from "react";
import componentJson from "@ukic/docs";
import canaryComponentJson from "@ukic/canary-docs";
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
  const componentDetails = componentDetailsJson.components.find(
    ({ tag }) => tag === component
  )!;

  const { props, slots, events, methods, styles } = componentDetails;

  return (
    <>
      {props.length > 0 && <PropTable propData={props} />}
      {slots.length > 0 && <SlotTable slotData={slots} />}
      {styles.length > 0 && <StyleTable styleData={styles} />}
      {events.length > 0 && <EventTable eventData={events} />}
      {methods.length > 0 && <MethodTable methodData={methods} />}
    </>
  );
};

export default ComponentDetails;
