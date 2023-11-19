import {FC} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../colors';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  name: string;
  content: string;
};

const Random: FC<Props> = ({name, content}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const state = navigation.getState();

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.wrap}>
        {state.routeNames
          .filter(name => !state.routes.find(route => route.name === name))
          .map(name => {
            return (
              <Button
                color={colors.contentText}
                key={name}
                title={`Go to ${name}`}
                onPress={() => navigation.push(name)}
              />
            );
          })}
      </View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  scroll: {
    paddingHorizontal: 16,
  },
  text: {color: colors.contentText, textAlign: 'justify'},
  title: {
    color: colors.contentText,
    fontSize: 17,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default Random;
