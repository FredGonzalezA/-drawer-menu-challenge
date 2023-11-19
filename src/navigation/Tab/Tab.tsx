import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Navigator: (typeof Tab)['Navigator'] = ({children, ...props}) => {
  return (
    <Tab.Navigator {...props} screenOptions={{header: () => null}}>
      {children}
    </Tab.Navigator>
  );
};

export default {
  ...Tab,
  Navigator,
};
