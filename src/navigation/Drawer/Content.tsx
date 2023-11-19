import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useLayoutEffect} from 'react';
import colors from '../../colors';
import {Progress} from './types';

type Props = {
  onProgressChange: (progress: Progress) => void;
} & DrawerContentComponentProps;

const Content: FC<Props> = ({onProgressChange, ...props}) => {
  const progress = useDrawerProgress();
  const defaultRouteOptions =
    props.descriptors[props.state.routes[0].key].options;

  useLayoutEffect(() => {
    // This way we can perform animations on elements that are parent of the Drawer.Navigator
    onProgressChange(progress);
  }, [onProgressChange, progress]);

  return (
    <DrawerContentScrollView {...props} style={styles.scroll}>
      <View style={styles.logoWrapper}>
        <Text style={styles.logo}>Beka</Text>
      </View>
      <View style={styles.listWrapper}>
        <DrawerItemList {...props} />
        <View style={styles.separator} />
        <DrawerItem
          style={defaultRouteOptions.drawerItemStyle}
          labelStyle={defaultRouteOptions.drawerLabelStyle}
          inactiveBackgroundColor={
            defaultRouteOptions.drawerInactiveBackgroundColor
          }
          activeTintColor={defaultRouteOptions.drawerActiveTintColor}
          inactiveTintColor={defaultRouteOptions.drawerInactiveTintColor}
          activeBackgroundColor={
            defaultRouteOptions.drawerActiveBackgroundColor
          }
          label="Sign Out"
          onPress={() => console.debug('Sign out')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {paddingTop: 64},
  logo: {
    color: colors.primaryText,
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
  },
  logoWrapper: {marginBottom: 32},
  separator: {
    marginTop: 64,
    marginBottom: 32,
    marginHorizontal: 12,
    height: 1,
    backgroundColor: colors.inactiveText,
  },
  listWrapper: {paddingLeft: 16},
});

export default Content;
