import Toast from 'react-native-root-toast';

export const showToast = (message, options) => {
  console.log('message', message)
  Toast.show(
    message,
    Object.assign(
      {
        delay: 0,
        duration: 2000,
        // position: -70,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
      },
      options,
    ),
  );
};

export default showToast;
