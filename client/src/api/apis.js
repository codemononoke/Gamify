const BASE_URL = "http://localhost:8800/api/v1";

export const authEndpoints = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  SIGNIN_API: `${BASE_URL}/auth/signin`,
  LOGOUT_API: `${BASE_URL}/auth/logout`,
};

export const settingEndpoints = {
  UPDATE_PROFILE_PICTURE_API: `${BASE_URL}/profile/updateProfilePicture`,
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
};

export const gamesEndpoints = {
  GET_ALL_GAMES_API: `${BASE_URL}/games/getAllGames`,
  GET_GAME_BY_ID_API: `${BASE_URL}/games/getGameById`,
};

export const orderEndPoints = {
  CREATE_ORDER_API: `${BASE_URL}/order/createOrder`,
  GET_USER_ORDERS_API: `${BASE_URL}/order/getUserOrders`,
};

export const paymentEndPoints = {
  PROCESS_PAYMENT_API: `${BASE_URL}/payment/process`,
  STRIPE_API: `${BASE_URL}/payment/stripeapi`,
};
