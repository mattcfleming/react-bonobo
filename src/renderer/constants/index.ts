// Defaults for Render
export const ViewDefaults = {
  size: 200, // 200x200
  lineHeight: 24,
};

export const ButtonDefaults = {
  containerStyle: {
    width: 85,
    elevation: 4,
    height: 30,
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  textStyle: {
    textAlign: 'center',
    margin: 8,
    color: 'white',
    fontSize: 18,
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf',
  },
  textDisabled: {
    color: '#cdcdcd',
  },
};

// ReactBonobo Internal Constants
export const _SectionBlockSize: number = 80; // 80x80
