import {createStackNavigator} from '@react-navigation/stack';
import Header from './Header';
import colors from '../../colors';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const Navigator: (typeof Stack)['Navigator'] = ({children, ...props}) => {
  return (
    <Stack.Navigator
      {...props}
      screenOptions={{
        headerTitleAlign: 'left',
        cardStyle: styles.cardStyle,
        header: () => {
          return <Header />;
        },
      }}>
      {children}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardStyle: {backgroundColor: colors.screenBackground},
});

export default {
  ...Stack,
  Navigator,
};
