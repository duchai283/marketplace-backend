import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { config } from 'src/global-config';
import { formatMoney } from 'src/utils/helper';
import moment from 'moment';
import { get } from 'lodash';
import { mapStateToLabel } from 'src/utils/helper';
import './styles.scss';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const items = get(order, 'total.items', []);
  const shipping = get(order, 'shipping', {});
  const [trackOrder, setTrackOrder] = useState(null);
  const journeys = get(trackOrder, 'journeys', []);
  const { id } = useParams();

  const mapStateToLabelHistory = state => {
    if (state === 'order_accepted') {
      return 'Chấp nhận đơn hàng';
    }
    if (state === 'order_fulfilled') {
      return 'Đơn hàng đang đóng gói';
    }
    if (state === 'order_delivery') {
      return 'Đơn hàng đang được vận chuyển';
    }
    if (state === 'order_cancelled') {
      return 'Đơn hàng đã từ chối';
    }
    if (state === 'order_completed') {
      return 'Hoàn thành đơn hàng';
    }
  };

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/order?id=${id}`);
        const data = await res.json();
        setOrder(data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getOrderDetails();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(
          `${config.apiUrl}/products/track-order?id=${id}`
        );
        const data = await res.json();
        console.log('data', data);
        setTrackOrder(data.data);
      } catch (error) {}
    };
    fetchOrderDetails();
  }, [id]);

  console.log('trackOrder', trackOrder);

  return (
    <div className="accountComponent">
      {/* <h1 className="ld-account-page--title">Order Details</h1> */}
      {order && (
        <div className="account_order_wrap">
          <div className="order-dt__head">
            <div className="order-dt__number">Order # {order._id} </div>
            <div className="order-dt__status">
              <div className={`order-status ${order.state}`}>
                {mapStateToLabel(order.state)}
              </div>
            </div>
          </div>
          <div className="order-dt__date">
            {moment(order.created_at).format('L')}
          </div>
          <div className="oder-dt__table">
            <div className="order-dt__text">Items Ordered</div>
            <div className="account_order_wrap">
              <div className="edit_address_wrap">
                <table className="table" style={{ minWidth: 800 }}>
                  <tbody>
                    <tr>
                      <th className="table-header first">
                        <div>Tên sản phẩm</div>
                      </th>
                      <th className="table-header first">
                        <div>Giá</div>
                      </th>
                      <th className="table-header first">
                        <div>Số lượng</div>
                      </th>
                      <th className="table-header first">
                        <div>Tổng tiền</div>
                      </th>
                    </tr>
                  </tbody>
                  <tbody>
                    {items.length !== 0 &&
                      items.map(item => (
                        <tr className="">
                          <td className="table-cell">
                            <div>{item.product.title}</div>
                          </td>
                          <td className="table-cell">
                            <div>
                              {formatMoney(
                                item.product.final_price
                                  ? item.product.final_price
                                  : item.product.price
                              )}
                            </div>
                          </td>
                          <td className="table-cell">
                            <div>{item.qty}</div>
                          </td>
                          <td className="table-cell">
                            <div style={{ fontWeight: 600, fontSize: 16 }}>
                              {formatMoney(item.totalAmount)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td className="table-cell" colSpan={3} align="right">
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                          Tổng Tiền
                        </div>
                      </td>
                      <td className="table-cell">
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                          {formatMoney(get(order, 'total.totalAmount'))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                borderBottom: '1px solid #ccc',
                padding: '15px 0',
                fontWeight: 'bold',
                fontSize: 22,
                marginTop: 30
              }}
            >
              Order Information
            </div>
            <div style={{ lineHeight: 2 }}>
              <div>{shipping.fullname}</div>
              <div>
                {order.shipping.city} - {order.shipping.district} -{' '}
                {order.shipping.ward}
              </div>
              <div>{shipping.phone}</div>
            </div>
          </div>
        </div>
      )}
      <div className="track-order__history">
        <div className="track-order__head">Status History</div>
        <div className="">
          <table className="table" style={{ minWidth: 980 }}>
            <tbody>
              <tr>
                <th className="table-header first">
                  <div>Date</div>
                </th>
                <th className="table-header first">
                  <div>Status</div>
                </th>
              </tr>
            </tbody>
            <tbody>
              {journeys.length !== 0 &&
                journeys.map(item => (
                  <tr className="">
                    <td className="table-cell">
                      <div>
                        {moment(item.created_at).format('L') +
                          ' ' +
                          moment(item.created_at).format('LT')}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div style={{ fontWeight: 700, color: '#28a745' }}>
                        {mapStateToLabelHistory(item.state)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
