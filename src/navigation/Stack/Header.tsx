import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DrawerNavigationProp,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {DRAWER_ID} from '../../constants';
import colors from '../../colors';
import {StackNavigationProp} from '@react-navigation/stack';

const Header = () => {
  const navigation =
    useNavigation<StackNavigationProp<any, any, string>>().getParent<
      DrawerNavigationProp<any>
    >(DRAWER_ID);

  const state = navigation.getState();

  // We display the Drawer's route name instead of Stack's
  const route = state.routes[state.index];
  const insets = useSafeAreaInsets();
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => {
    const value = progress?.value ?? 0;
    return {
      marginTop: interpolate(value, [0, 1], [insets.top, 0]),
    };
  });
  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          marginLeft: insets.left,
          marginRight: insets.right,
          alignItems: 'center',
        },
        animatedStyle,
      ]}>
      <TouchableOpacity
        style={styles.hamburger}
        onPress={navigation.openDrawer}>
        <Icon size={20} name="three-bars" color={colors.headerText} />
      </TouchableOpacity>

      <Text style={styles.title}>{route.name.toUpperCase()}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hamburger: {paddingVertical: 22, paddingHorizontal: 22},
  title: {
    letterSpacing: 3,
    fontSize: 17,
    color: colors.headerText,
  },
});

export default Header;
