import { store } from 'react-notifications-component';

const addNotification = (message, type) => {
  store.addNotification({
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export default addNotification;
