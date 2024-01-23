import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { orderEndPoints } from "../../api/apis";
import { setLoading, setOrders } from "../../redux/ordersSlice";
import Moment from "react-moment";
import "moment-timezone";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Order Id",
  "Items Name",
  "Items No.",
  "Total Price",
  "Payment Status",
  "Paid At",
  "Dispatched",
];

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(setLoading(true));
    const getUserOrders = async () => {
      try {
        const response = await apiConnector(
          "GET",
          orderEndPoints.GET_USER_ORDERS_API,
          {},
          {
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.msg);
        }

        dispatch(setOrders(response.data.orders));
      } catch (error) {
        console.log("GET_USER_ORDERS_API API ERROR......", error);
        toast.error(error);
      }
      dispatch(setLoading(false));
    };
    getUserOrders();
  }, [access_token, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" w-full max-w-[1320px] h-full mx-auto px-4 lg:px-8 mt-[40px] ">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={order?._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order?._id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <List>
                      {order?.cart?.map((item, index) => (
                        <Link to={`/game-detail/${item?._id}`}>
                          <ListItem
                            key={index}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.name}
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order?.totalItems}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      ${order?.totalPrice}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="green"
                      className="font-medium"
                    >
                      {order?.paymentInfo?.status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      <Moment>{order?.paidAt}</Moment>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="red"
                      className="font-medium"
                    >
                      Pending
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default OrdersPage;
