# ecom-store-react

1. General requirement: The web app must use tech stacks:
-React hook form/ FormIk, validation with yup.
-Hooks:useState, useEffect and custom hooks (such as create a useAddOrder.ts)
-Context to manage share data such as authenticated user.
-Redux for mange state and handling apicall. Can use redux toolkit, reduxthunk/saga.
-Nice to have web app public hosted.
2. Use case:
a.User authentication: The web app should have a login system that allows users to create an account, login, and manage their profile.
b.Product catalog: The web app should have a catalog of all the available products for sale. The catalog should include a picture of each product, its name, price, and a brief description.
c.Order catalog : Add order from product list, the web app should have a catalog of all orders added. (Can use local storage to store added order).
d.Protected route: The web app should check admin roles to view orders.
e.Auth routed: The only authenticated user can see their profile
f.Optional:
1.Dark and Light theme.
2.Payment gateway: The web app should have a payment gateway that allows users to pay for their purchases securely