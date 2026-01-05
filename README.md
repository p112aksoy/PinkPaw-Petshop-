#  Petshop Web Application

A simple Petshop e-commerce web application developed for educational purposes. This project demonstrates basic frontend and backend integration, shopping cart functionality, and an order creation flow.

##  Features

- User login and registration  
- Product listing on the homepage  
- Add and remove products from the shopping cart  
- Increase and decrease product quantity  
- Dynamic cart total price calculation  
- Create orders from cart items  
- View previous orders on the My Orders page  
- Order details shown in a dialog or popup  
- Responsive user interface built with Material UI  

##  Technologies

### Frontend
- React  
- React Router  
- Material UI (MUI)  
- Axios  

### Backend
- Java  
- Spring Boot  

##  Project Structure

### Frontend
src/
├─ components/
├─ pages/
├─ context/
├─ services/
└─ App.js


### Backend
src/main/java/
├─ controller/
├─ service/
├─ repository/
└─ model/


##  How It Works

Products are displayed on the homepage.  
Users add products to the shopping cart.  
Cart state is managed globally using React Context.  
Users can update quantities or remove items from the cart.  
When an order is placed, cart data is sent to the backend via REST API.  
Users can view their orders on the My Orders page.

##  Notes

This project is created for learning purposes.  
Authentication and payment systems are simplified.

##  Possible Improvements

- Admin panel for product management  
- Payment system integration  
- Product search and filtering  
- Image upload support  

##  Author

Computer Engineering Student Pelin Aksoy

