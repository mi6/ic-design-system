import React, { ReactElement } from "react";
import { IcCardHorizontal } from "@ukic/canary-react";
import { useViewportWidth } from "../../utils/helpers";

interface GetStartedHorizontalCardProps {
  heading: string;
  message: string;
  children: ReactElement;
  href: string;
}
const GetStartedHorizontalCard: React.FC<GetStartedHorizontalCardProps> = ({
  heading,
  message,
  children,
  href,
}) => {
  const viewportWidth = useViewportWidth();
  const isSmallViewport = viewportWidth < 577;

  return (
    <IcCardHorizontal
      heading={heading}
      message={message}
      href={href}
      clickable
      size="large"
      style={{ "--card-horizontal-width": "100%" }}
    >
      {!isSmallViewport && children}
    </IcCardHorizontal>
  );
};

export default GetStartedHorizontalCard;
