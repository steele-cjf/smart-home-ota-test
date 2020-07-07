import Toast from 'react-native-root-toast';

export const showToast = (message, options) => {
  Toast.show(
    message,
    Object.assign(
      {
        delay: 0,
        duration: 300,
        position: -70,
        shadow: false,
        animation: true,
        hideOnPress: true,
      },
      options,
    ),
  );
};

export default showToast;