import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";

export const isImage = (str: string): boolean => {
  return /https:\/\/[^ ]+(gif|jpg|jpeg|tiff|png)/i.test(str);
};

export const ellipsisText = (
  str?: string,
  enterDelay = 700,
  maxLenght = 30,
  disableTooltip = false
): JSX.Element | string | undefined => {
  return str && str.length > maxLenght ? (
    !disableTooltip ? (
      <AnimatedTooltip
        interactive
        disableChildrenAnimation
        enterDelay={enterDelay}
        content={str}
      >
        {str.substring(0, maxLenght) + "..."}
      </AnimatedTooltip>
    ) : (
      str.substring(0, maxLenght) + "..."
    )
  ) : (
    str
  );
};

export const titleCase = (str: string): string => {
  var splitStr = str.replaceAll("_", " ").toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};
