export interface NavigationMenu {

  title: string;
  disabled?: boolean;
  selected?: boolean;
  childSection?: Array<NavigationMenu>;
  anchor?: string;
  id?: string;
  roles?: Array<string>;
  link?: string;
  hidden?: boolean;
  icon?: string;
}
