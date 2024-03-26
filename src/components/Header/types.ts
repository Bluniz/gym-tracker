import { ReactNode } from "react";

export interface HeaderProps {
  title: string;
  subTitle?: string;
  enableGoBack?: boolean;
  onBackAreDisabled?: boolean
  onGoBackPress?: () => void;
  rightComponent?:ReactNode
  isLoading?: boolean
  
}
