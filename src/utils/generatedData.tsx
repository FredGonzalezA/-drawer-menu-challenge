import random from './random';
import Icon from 'react-native-vector-icons/Octicons';
import {Tab, Stack, Drawer} from '../navigation';
import {ComponentProps} from 'react';
import {Random} from '../screens';
import contents from '../assets/loremIpsum.json';

type StackProps = Omit<
  ComponentProps<typeof Stack.Screen>,
  'component' | 'getComponent'
>;
type TabProps = Omit<
  ComponentProps<typeof Tab.Screen>,
  'component' | 'getComponent' | 'children'
>;
type DrawerProps = Omit<
  ComponentProps<typeof Drawer.Screen>,
  'component' | 'getComponent' | 'children'
>;

const grabAndShuffle = <T,>(arr: T[], sizeRange = [0.8, 1]): T[] => {
  return [...arr]
    .sort(() => random() - 0.5)
    .slice(
      // Grab random size of this array
      0,
      Math.max(
        1,
        (random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]) * arr.length,
      ),
    );
};

const generateStack = (name: string): StackProps => {
  const customContent = grabAndShuffle(contents, [0.1, 0.3]).join('\n\n');
  return {
    name,
    children: () => <Random content={customContent} name={name} />,
  };
};

const generateTab = (name: string, iconName: string): TabProps => {
  return {
    name,
    options: {
      tabBarIcon: props => (
        <Icon name={iconName} size={16} color={props.color} />
      ),
    },
  };
};

const stacks: StackProps[] = Array(5)
  .fill(null)
  .map((_, index) => generateStack(`Stack ${index}`));

const tabs: TabProps[] = [
  generateTab('Home', 'home'),
  generateTab('Contact', 'mail'),
  generateTab('Share', 'share'),
  generateTab('Save', 'bookmark'),
  generateTab('Schedule', 'calendar'),
];

const screens: DrawerProps[] = [
  {name: 'Start'},
  {name: 'Your Cart'},
  {name: 'Favorites'},
  {name: 'Your Orders'},
];

export default {
  screens: screens.map(screen => ({
    ...screen,
    tabs: grabAndShuffle(tabs).map(tab => {
      return {...tab, stacks: grabAndShuffle(stacks)};
    }),
  })),
};
