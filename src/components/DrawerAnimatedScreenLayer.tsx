import {PropsWithChildren} from 'react';
import {useScreenStyles} from '../navigation/Drawer/hooks';
import Animated from 'react-native-reanimated';

export default ({children}: PropsWithChildren) => {
  const animatedStyles = useScreenStyles();
  return <Animated.View style={animatedStyles}>{children}</Animated.View>;
};
