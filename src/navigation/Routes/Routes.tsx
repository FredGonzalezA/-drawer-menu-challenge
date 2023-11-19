import {Tab} from '../Tab';
import {Stack} from '../Stack';
import data from '../../utils/generatedData';
import {Drawer} from '../Drawer';
import {FC, memo} from 'react';
import {DrawerAnimatedScreenLayer} from '../../components';

type TabsData = (typeof data.screens)[number]['tabs'];
type StacksData = TabsData[number]['stacks'];

const StackRoutes: FC<{stacks: StacksData}> = memo(({stacks}) => {
  return (
    <Stack.Navigator>
      {stacks.map(stack => {
        if (!stack.children) {
          return null;
        }
        return (
          <Stack.Screen key={stack.name} {...stack}>
            {stack.children}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
});

const TabRoutes: FC<{tabs: TabsData}> = memo(({tabs}) => {
  return (
    <Tab.Navigator>
      {tabs.map(({stacks, ...tab}) => (
        <Tab.Screen key={tab.name} {...tab}>
          {() => <StackRoutes stacks={stacks} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
});
export default () => {
  return (
    <Drawer.Navigator>
      {data.screens.map(({tabs, ...screen}) => {
        return (
          <Drawer.Screen key={screen.name} {...screen}>
            {() => (
              <DrawerAnimatedScreenLayer>
                <TabRoutes tabs={tabs} />
              </DrawerAnimatedScreenLayer>
            )}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
};
