import {useDrawerProgress} from '@react-navigation/drawer';
import {useWindowDimensions} from 'react-native';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const triangleHeight = 32;
const borderRadius = 32;
const offsetHeight = 16;
export default () => {
  const progress = useDrawerProgress();
  const window = useWindowDimensions();
  return useAnimatedStyle(() => {
    /*
         We need to get ANGLE
           SCREEN.WIDTH / 2
         ##################___________________
         #                # <- offsetHeight
         #                #___________________
         #             #  #
         #         #      # <- triangleHeight
         #     #          #
         # #  ANGLE       #
         ##################___________________
     */
    const rotateDeg =
      90 - (Math.atan(window.width / (2 * triangleHeight)) / Math.PI) * 180;

    /*
         #           #####
         #       ##
         #     ##
         #    ##        This is the top left border radius of the rotated screen
         #    ##
         #    ##
         ########
            ^
            |
        horizontalOffset <- We need to get this to perfectly make the border radius touch the edge of its space

     */
    const horizontalOffset =
      -borderRadius * Math.sin((rotateDeg * Math.PI) / 180);

    return {
      height: '100%',
      overflow: 'hidden',
      borderTopLeftRadius: interpolate(
        progress.value,
        [0, 1],
        [0, borderRadius],
      ),
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [0, offsetHeight + triangleHeight],
          ),
        },
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, horizontalOffset],
          ),
        },
        // We need to move the anchor point from the center to the side we want to rotate from
        {translateX: -window.width / 2},
        {translateY: -window.height / 2},
        {
          rotate: interpolate(progress.value, [0, 1], [0, -rotateDeg]) + 'deg',
        },
        // We need to restore the anchor point to the center
        {translateX: window.width / 2},
        {translateY: window.height / 2},
      ],
    };
  });
};
