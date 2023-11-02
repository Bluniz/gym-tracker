import { View, StyleSheet, Text } from 'react-native';
import { Theme } from '../../styles/theme';


interface TrainingItemProps {
  title: string 
  doneQtd?: number
}


export const TrainingItem = ({title, doneQtd = 0}: TrainingItemProps) => {


  return (
    <View style={styles.listItem}>
      <View style={styles.itemBody}>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={styles.itemFooter}>
        <Text style={styles.itemDoneText}>Done: {doneQtd} times</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 148,
    backgroundColor: Theme.colors.gray300,
    borderColor: Theme.colors.red500,
    borderWidth: 2,
    padding: 8,
    position: 'relative'
  },


  itemBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  itemFooter: {
  
  },
  itemTitle: {
    color: Theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold'
  },
  itemDoneText: {
    position: 'absolute',
    fontSize: 12,
    color: Theme.colors.white,
    bottom: 0
  }
});