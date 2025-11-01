import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type ButtonProps = {
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  onClick: () => void;
  rightIcon?: ReactNode;
  text: string;
  variant?: ChakraButtonProps["variant"];
};

function Button({
  isDisabled,
  isFullWidth,
  isLoading,
  leftIcon,
  onClick,
  rightIcon,
  text,
  variant,
}: ButtonProps) {
  return (
    <ChakraButton
      _focusVisible={{ borderColor: "blue.focusRing", outlineWidth: 1 }}
      borderRadius={0}
      colorPalette="blue"
      disabled={isDisabled}
      flex={isFullWidth ? 1 : undefined}
      loading={isLoading}
      onClick={onClick}
      outlineOffset={0}
      size="sm"
      variant={variant}
    >
      {leftIcon}
      {text}
      {rightIcon}
    </ChakraButton>
  );
}

export default Button;
