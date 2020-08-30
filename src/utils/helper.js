export const formatMoney = money => {
  if (!money) {
    return '0 đ';
  }
  return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const mapStateToLabel = state => {
  if (state === 'order_accepted') {
    return 'Accepted';
  }
  if (state === 'order_cancelled') {
    return 'Canceled';
  }
  if (state === 'order_completed') {
    return 'Completed';
  }
  if (state === 'order_fulfilled') {
    return 'Being Fulfilled';
  }
  if (state === 'order_delivery') {
    return 'Delivery';
  }
};
