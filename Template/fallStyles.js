// Template/fallStyles.js
import { StyleSheet } from 'react-native';

const fallStyles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallingFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conttemps: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    flexWrap:'wrap',
    gap:10,
    width:'100%',
  },
  fallingObject: {
    width: 300,
    height: 50,
    position: 'absolute',
    top: 0,
    padding:5,
    backgroundColor:'transparent',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6d29db',
    borderWidth: 2,
    marginLeft:5,
    borderRadius:5,
  },
  fallingText: {
    textAlign:"center",
    fontSize: 20,
    fontWeight:'bold',
    color: '#6d29db',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
  score: {
    fontSize: 30,
    padding:12,
    fontWeight:'bold',
    color: '#43168c',
  },
  lost: {
    fontSize: 26,
    padding:12,
    fontWeight:'bold',
    color: '#43168c',
    textAlign:"center",
  },
});

export default fallStyles;