import elements from '../../theming/elements';

export default {
  deck: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    backgroundColor: elements.input.backgroundColor,
    margin: 10,
    padding: 20,
    borderRadius: 3,
    // boxShadow: '0 4px 5px rgba(0, 0, 0, 0.2)'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    width: '100%',
    paddingTop: 10
  },
  title: {},
  img: {
    height: 20,
    width: 20
  },
  description: {
    paddingBottom: 10
  },
};
