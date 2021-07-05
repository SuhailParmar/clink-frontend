import colours from './colours';

const containerBase = {
  margin: 20,
};

export default {
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: colours.complement.normal,
    borderRadius: 4,
    boxShadow: `0 4px 5px ${colours.grey.normal}`,
    cursor: 'pointer'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerBase,
  containerText: {
    ...containerBase,
    marginTop: 0,
  },
  containerScreen: {
    ...containerBase,
    marginTop: 0,
  },
  input: {
    ...containerBase,
    height: 40,
    padding: 10,
    backgroundColor: colours.grey.lighter,
    borderRadius: 4,
    border: `1px solid ${colours.grey.dark}`,
  }
};
