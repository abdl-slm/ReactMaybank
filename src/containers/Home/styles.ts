import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30
  },
  valueSection: {
    marginBottom: 10,
    padding: 10
  },
  listItem: {   
    marginBottom: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    height:200,
    backgroundColor: '#000000'
  },
  map: {
    maxHeight: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex: 1,
    zIndex: -1
  }
});
