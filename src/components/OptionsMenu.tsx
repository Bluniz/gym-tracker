import { Button, ButtonIcon } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel } from '@/src/components/ui/menu';
import clsx from 'clsx';
import { EllipsisVertical, LucideIcon } from 'lucide-react-native';
import { ViewProps } from 'react-native';

export interface OptionsMenuItem {
  name: string;
  key: string;
  icon?: LucideIcon;
  action: () => void;
  labelClassname?: ViewProps['className'];
}

interface OptionsMenuProps {
  items: OptionsMenuItem[];
  triggerIcon?: LucideIcon;
}

export const OptionsMenu = ({ items, triggerIcon = EllipsisVertical }: OptionsMenuProps) => {
  return (
    <Menu
      offset={5}
      className="bg-gray-800"
      trigger={({ ...trigerProps }) => {
        return (
          <Button {...trigerProps} variant="link">
            <ButtonIcon as={triggerIcon} />
          </Button>
        );
      }}
    >
      {items.map((item) => (
        <MenuItem key={item.key} textValue={item.name} onPress={item.action}>
          {item.icon && (
            <Icon as={item.icon} size="sm" className={clsx('mr-2', item.labelClassname)} />
          )}
          <MenuItemLabel size="sm">{item.name}</MenuItemLabel>
        </MenuItem>
      ))}
    </Menu>
  );
};
