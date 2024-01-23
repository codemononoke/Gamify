import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { apiConnector } from "../../api/apiConnector";
import { orderEndPoints, paymentEndPoints } from "../../api/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartSlice";

const CheckOutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { access_token } = useSelector((state) => state.auth);

  const subTotalPrice = cart
    .reduce((total, item) => total + item?.price * 1, 0)
    .toFixed(2);
  const totalPrice = (parseFloat(subTotalPrice) + 5.0).toFixed(2);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const { address, city, state, country, pinCode } = shippingAddress;

  const handleOnChange = (e) => {
    setShippingAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    try {
      const response = await apiConnector(
        "POST",
        paymentEndPoints.PROCESS_PAYMENT_API,
        {
          amount: Math.ceil(totalPrice),
        },
        {
          Authorization: `Bearer ${access_token}`,
        }
      );

      const clientSecret = response.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const data = {
            cart,
            totalPrice,
            totalItems: cart?.length,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
            shippingAddress: {
              address: address ? address : user?.additionalDetails?.address,
              city: city ? city : user?.additionalDetails?.city,
              state: state ? state : user?.additionalDetails?.state,
              country: country ? country : user?.additionalDetails?.country,
              pinCode: pinCode ? pinCode : user?.additionalDetails?.pinCode,
            },
          };

          try {
            const response = await apiConnector(
              "POST",
              orderEndPoints.CREATE_ORDER_API,
              data,
              {
                Authorization: `Bearer ${access_token}`,
              }
            );

            if (!response.data.success) {
              throw new Error(response.data.msg);
            }

            dispatch(clearCart());
            toast.success("Order Successful!");
            navigate("/orders")
          } catch (error) {
            console.log("CREATE_ORDER_API API ERROR.......", error);
          }
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      toast.error(error);
    }
  };

  return (
    <div className="w-full max-w-[1320px] h-full mx-auto px-4 lg:px-8 mt-[40px] ">
      <Typography variant="h4" color="blue-gray" className=" mb-4">
        Checkout
      </Typography>
      <form
        onSubmit={handleOnSubmit}
        className=" flex flex-col lg:flex-row items-center lg:items-start w-full gap-10 mb-10"
      >
        <Card color="transparent" className="flex flex-1 w-full" shadow={false}>
          <div className=" mb-2 w-full">
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="h6"
                className="-mb-3 text-gray-800 font-medium"
              >
                Shipping Information
              </Typography>
              <Input
                size="lg"
                placeholder="Address"
                name="address"
                onChange={(e) => handleOnChange(e)}
                defaultValue={
                  address ? address : user?.additionalDetails?.address
                }
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className=" flex items-center gap-2">
                <Input
                  size="lg"
                  placeholder="Pin Code"
                  name="pinCode"
                  onChange={(e) => handleOnChange(e)}
                  defaultValue={
                    pinCode ? pinCode : user?.additionalDetails?.pinCode
                  }
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  size="lg"
                  placeholder="City"
                  name="city"
                  onChange={(e) => handleOnChange(e)}
                  defaultValue={city ? city : user?.additionalDetails?.city}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className=" flex items-center gap-2 border-b-2 pb-4">
                <Input
                  size="lg"
                  placeholder="state"
                  name="state"
                  onChange={(e) => handleOnChange(e)}
                  defaultValue={state ? state : user?.additionalDetails?.state}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  size="lg"
                  placeholder="Country"
                  name="country"
                  onChange={(e) => handleOnChange(e)}
                  defaultValue={
                    country ? country : user?.additionalDetails?.country
                  }
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Typography
                variant="h6"
                className="-mb-3 text-gray-800 font-medium"
              >
                Payment
              </Typography>
              <div className=" flex flex-col">
                <Typography
                  variant="h6"
                  className=" text-gray-600 mb-3 text-sm font-medium"
                >
                  Card Expire
                </Typography>
                <CardNumberElement className=" border-2 border-blue-gray-200 py-3 px-2 rounded-lg" />
              </div>
              <div className=" flex items-center w-full gap-2">
                <div className=" flex flex-col w-full">
                  <Typography
                    variant="h6"
                    className=" text-gray-600 mb-3 text-sm font-medium"
                  >
                    Card Expire
                  </Typography>
                  <CardExpiryElement className="border-2 border-blue-gray-200 py-3 px-2 rounded-lg" />
                </div>
                <div className=" flex flex-col w-full">
                  <Typography
                    variant="h6"
                    className=" text-gray-600 mb-3 text-sm font-medium"
                  >
                    Card CVC
                  </Typography>
                  <CardCvcElement className="border-2 border-blue-gray-200 py-3 px-2 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className=" flex flex-1 w-full flex-col">
          {cart?.map((item, index) => (
            <Card
              key={index}
              className=" flex flex-row p-2 items-center justify-between mb-2 border-b-2 rounded-none pb-4"
              shadow={false}
            >
              <div className=" flex gap-2 ">
                <div className=" w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={item?.cover}
                    alt={item?.surname}
                    className=" h-full w-full object-cover"
                  />
                </div>
                <div className=" flex flex-col items-start gap-1">
                  <Typography
                    variant="h3"
                    className=" text-lg text-black font-semibold"
                  >
                    {item?.name}
                  </Typography>
                  <Typography
                    variant="p"
                    className=" text-md text-gray-600 font-medium"
                  >
                    ${item?.price}
                  </Typography>
                </div>
              </div>
            </Card>
          ))}
          <Card
            className=" flex flex-row p-2 items-center justify-between mb-2 border-b-2 rounded-none pb-4"
            shadow={false}
          >
            <Typography
              variant="h4"
              className=" text-md text-gray-500 font-normal"
            >
              Subtotal
            </Typography>
            <Typography
              variant="h4"
              className=" text-md text-gray-500 font-normal"
            >
              ${subTotalPrice}
            </Typography>
          </Card>
          <Card
            className=" flex flex-row p-2 items-center justify-between mb-2 border-b-2 rounded-none pb-4"
            shadow={false}
          >
            <Typography
              variant="h4"
              className=" text-md text-gray-500 font-normal"
            >
              Shipping
            </Typography>
            <Typography
              variant="h4"
              className=" text-md text-gray-500 font-normal"
            >
              $5.00
            </Typography>
          </Card>
          <Card
            className=" flex flex-row p-2 items-center justify-between mb-2 border-b-2 rounded-none pb-4"
            shadow={false}
          >
            <Typography
              variant="h4"
              className=" text-lg text-black font-normal"
            >
              Shipping
            </Typography>
            <Typography
              variant="h4"
              className=" text-lg text-black font-normal"
            >
              ${totalPrice}
            </Typography>
          </Card>
          <Button type="submit" id="pay_btn" className=" mt-2">
            Conform Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;
