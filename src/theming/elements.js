import colours from './colours';

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
  input: {
    margin: 15,
    padding: 10,
    backgroundColor: colours.grey.lighter,
    borderRadius: 4,
    border: `1px solid ${colours.grey.dark}`,
  }
};
