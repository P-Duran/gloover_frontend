import { AnimatedTooltip } from "components/tootltip/AnimatedTooltip";

export const isImage = (str: string): boolean => {
  return /https:\/\/[^ ]+(gif|jpg|jpeg|tiff|png)/i.test(str);
};

export const ellipsisText = (
  str: string,
  maxLenght = 50
): JSX.Element | string => {
  return str.length > maxLenght ? (
    <AnimatedTooltip
      interactive
      disableChildrenAnimation
      enterDelay={700}
      content={str}
    >
      {str.substring(0, maxLenght) + "..."}
    </AnimatedTooltip>
  ) : (
    str
  );
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
