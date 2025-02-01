import clsx from 'clsx';
import { Button, ButtonSpinner, ButtonText, IButtonProps } from './ui/button';
import { ViewProps } from 'react-native';

interface CustomButtonProps extends IButtonProps {
  isLoading?: boolean;
  text: string;
  textClassName?: ViewProps['className'];
}

export const CustomButton = ({
  isLoading,
  className,
  action,
  text,
  textClassName,
  ...rest
}: CustomButtonProps) => {
  const isPrimaryAction = action === 'primary';
  const isSecondaryAction = action === 'secondary';
  return (
    <Button
      {...rest}
      action={action}
      className={clsx(
        className,
        'rounded-xl disabled:opacity-75',
        isPrimaryAction && 'bg-red-700',
        isSecondaryAction && 'bg-white',
      )}
    >
      {isLoading ? (
        <ButtonSpinner />
      ) : (
        <ButtonText
          className={clsx(
            isPrimaryAction && 'text-white',
            isSecondaryAction && 'text-black',
            textClassName,
          )}
        >
          {text}
        </ButtonText>
      )}
    </Button>
  );
};
