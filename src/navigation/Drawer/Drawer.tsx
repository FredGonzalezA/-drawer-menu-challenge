import {createDrawerNavigator} from '@react-navigation/drawer';
import Content from './Content';
import {useState} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DRAWER_ID} from '../../constants';
import colors from '../../colors';
import {StyleSheet} from 'react-native';
import {Progress} from './types';

export const Drawer = createDrawerNavigator();

const Navigator: (typeof Drawer)['Navigator'] = ({children, ...props}) => {
  const [progress, setProgress] = useState<Progress | null>(null);
  const safeInsets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const value = progress?.value ?? 0;
    return {
      borderTopLeftRadius: interpolate(value, [0, 1], [0, 32]),
      marginTop: interpolate(value, [0, 1], [0, safeInsets.top + 12]),
    };
  });
  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Drawer.Navigator
        id={DRAWER_ID}
        drawerContent={props => (
          <Content {...props} onProgressChange={setProgress} />
        )}
        {...props}
        screenOptions={{
          drawerActiveBackgroundColor: colors.buttonActive,
          drawerInactiveBackgroundColor: 'transparent',
          drawerActiveTintColor: colors.activeText,
          drawerInactiveTintColor: colors.inactiveText,
          overlayColor: 'transparent',
          drawerType: 'back',
          headerTransparent: true,
          header: () => null,
          drawerLabelStyle: styles.drawerLabelStyle,
          drawerItemStyle: styles.drawerItemStyle,
          drawerStyle: styles.drawerStyle,
          drawerContentStyle: styles.drawerContentStyle,
          sceneContainerStyle: styles.sceneContainerStyle,
        }}>
        {children}
      </Drawer.Navigator>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.drawerBackground,
  },
  drawerLabelStyle: {fontSize: 16, marginHorizontal: 12},
  drawerItemStyle: {
    borderRadius: 12,
    marginRight: 0,
  },
  drawerStyle: {
    width: '50%',
    backgroundColor: 'transparent',
  },
  drawerContentStyle: {paddingRight: 0, backgroundColor: 'red'},
  sceneContainerStyle: {backgroundColor: 'transparent'},
});

export default {
  ...Drawer,
  Navigator,
};
