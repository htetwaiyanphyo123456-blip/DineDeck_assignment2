DineDeck Restaurant Discovery and Reservation Website
======================================================

Website Structure:
------------------
- index.html           : Home page introducing the platform with logo and banner image
- restaurants.html     : Restaurant listing page showing 8 restaurants with images, cuisine, dishes, prices, deposits, and descriptions
- recommend.html       : Recommendation page with form for dietary preference, budget, dining purpose; shows matched restaurants dynamically
- register.html        : User registration page with form including validation for username, email, phone, password, gender, diet, and country
- reservation.html     : Reservation page with form for booking, deposit logic, payment method with conditional fields, validation, and billing email autofill

Supporting files:
- css/style.css        : External CSS file for layout, styling, and responsive design (desktop, tablet, mobile)
- js/script.js         : JavaScript file for form validations, recommendation logic, dynamic deposit updates, and conditional field behaviors
- images/              : Folder containing all 8 images (including logo and restaurant photos)

GitHub Repository:
------------------
Include your GitHub repository URL here to allow marking access.

Example:
https://github.com/yourusername/dinedeck-restaurant-assignment2

JavaScript Validation Logic (plain English):
---------------------------------------------
- Registration form checks user input:
  - Username: minimum 5 characters, letters, numbers, underscores only
  - Email: must be a valid email format
  - Phone: digits only, between 8 and 15 digits
  - Password: minimum 10 characters, must contain uppercase, lowercase, number, and special character
  - Confirm Password: must match the password exactly
  - Gender: must be selected
- Recommendation form evaluates user preferences, matching restaurants based on diet, budget, and dining purpose, showing results dynamically
- Reservation form validates:
  - Required fields are filled
  - Email format valid
  - Phone number has at least 10 digits
  - Reservation date/time is not in the past
  - Number of people is greater than zero
  - Payment method logic shows/hides voucher or credit card fields accordingly
  - Voucher code must be 12 digits if voucher is selected (no further validation)
  - Credit card must be digits only and 16 digits for Visa/MasterCard or 15 digits for Amex
  - Billing email valid; checkbox to autofill same as contact email
- Errors block submission and display alert messages until fixed

Known Issues or Limitations:
-----------------------------
- The reservation form posts to external Mercury server URL for backend testing but no real database connection.
- Credit card validation is format-only, no real processing.
- Recommendation logic is simple rule-based and may not cover all user tastes.
- Images are used from provided assets and may require optimization for web.

References:
-----------
- Images and logos provided by user and used with permission.
- HTML5, CSS3, JavaScript knowledge based on standard web development principles.
- Assignment specification from COS10005 Web Development course, Swinburne University of Technology.

---

Thank you for reviewing DineDeck!

