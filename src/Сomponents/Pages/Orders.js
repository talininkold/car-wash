import React, { useEffect, useContext } from "react";
import FilterContext from "./../Context/filterContext";
import Spinner from "./../Layout/Spinner2";

const Orders = () => {
  const {
    loading,
    orders,
    getOrders
  } = useContext(FilterContext);

  useEffect(() => {
    if (orders.length === 0) {
      getOrders();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h4>
        Заказы на доставку
      </h4>
      {loading ? (
        <Spinner />
      ) : orders.length === 1 ? (
        <p>Нет заказов</p>
      ) :  (
        <div style={{overflowX: 'scroll'}}>
          <table>
            <tbody id="archive-table">
              {orders.map((tr, i) => (
                <tr key={i}>
                  {tr.map((td, i) => (
                    <td key={i}>
                      {td}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
