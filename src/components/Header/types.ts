export interface HeaderProps {
  title: string;
  subTitle?: string;
  enableGoBack?: boolean;
  onBackAreDisabled?: boolean
  onGoBackPress?: () => void;
  
}
