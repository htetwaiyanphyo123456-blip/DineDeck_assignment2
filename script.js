document.addEventListener("DOMContentLoaded", function () {
  // Recommendation logic
  const recommendForm = document.getElementById("recommendForm");
  const recommendationResult = document.getElementById("recommendationResult");

  const restaurants = [
    {
      name: "La Bella Pasta",
      cuisine: "Italian",
      deposit: 20,
      budget: "Low",
      diet: "None",
      purpose: ["Family", "Date"],
    },
    {
      name: "Curry House Delight",
      cuisine: "Indian",
      deposit: 25,
      budget: "Medium",
      diet: "Halal",
      purpose: ["Family", "Business"],
    },
    {
      name: "Green Leaf Vegan",
      cuisine: "Vegan",
      deposit: 15,
      budget: "Low",
      diet: "Vegan",
      purpose: ["Family", "Date", "Business"],
    },
    {
      name: "The Luxe Table",
      cuisine: "Contemporary",
      deposit: 50,
      budget: "High",
      diet: "None",
      purpose: ["Date", "Business"],
    },
    {
      name: "Family Feast",
      cuisine: "Mixed",
      deposit: 20,
      budget: "Low",
      diet: "None",
      purpose: ["Family"],
    },
    {
      name: "Spice & Harmony",
      cuisine: "Fusion",
      deposit: 30,
      budget: "Medium",
      diet: "None",
      purpose: ["Date", "Business", "Family"],
    },
    {
      name: "DineDeck App Lounge",
      cuisine: "Modern Contemporary",
      deposit: 40,
      budget: "Medium",
      diet: "None",
      purpose: ["Date", "Business"],
    },
    {
      name: "Kebab Corner",
      cuisine: "Middle Eastern Street Food",
      deposit: 15,
      budget: "Low",
      diet: "Halal",
      purpose: ["Family"],
    },
  ];

  if (recommendForm) {
    recommendForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const diet = recommendForm.diet.value;
      const budget = recommendForm.budget.value;
      const purpose = recommendForm.purpose.value;

      const matched = restaurants.filter((r) => {
        const dietMatch = diet === "None" || r.diet === diet || r.diet === "None";
        const budgetMatch = r.budget === budget;
        const purposeMatch = r.purpose.includes(purpose);
        return dietMatch && budgetMatch && purposeMatch;
      });

      if (matched.length === 0) {
        recommendationResult.textContent = "Sorry, no restaurants match your preferences.";
        return;
      }

      let html = "<h2>Recommended Restaurants:</h2><ul>";
      matched.forEach((r) => {
        html += `<li><strong>${r.name}</strong> - Cuisine: ${r.cuisine}, Deposit: RM${r.deposit}</li>`;
      });
      html += "</ul><p>Select one to proceed to reservation.</p>";
      recommendationResult.innerHTML = html;
    });
  }

  // Registration form validation
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let errors = [];

      const username = registerForm.username.value.trim();
      const email = registerForm.email.value.trim();
      const phone = registerForm.phone.value.trim();
      const password = registerForm.password.value;
      const confirmPassword = registerForm.confirmPassword.value;
      const gender = registerForm.gender.value;

      // Username: min 5 chars, letters, numbers, _
      if (!/^\w{5,}$/.test(username)) {
        errors.push("Username must be at least 5 characters and contain only letters, numbers, and underscores.");
      }
      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Enter a valid email address.");
      }
      // Phone: digits only, 8-15 digits
      if (!/^\d{8,15}$/.test(phone)) {
        errors.push("Phone number must contain 8 to 15 digits only.");
      }
      // Password: min 10 chars with uppercase, lowercase, number, special char
      if (
        password.length < 10 ||
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/\d/.test(password) ||
        !/[^\w\s]/.test(password)
      ) {
        errors.push(
          "Password must be at least 10 characters and include uppercase, lowercase, number, and special character."
        );
      }
      // Confirm password
      if (password !== confirmPassword) {
        errors.push("Password and Confirm Password do not match.");
      }
      // Gender selected
      if (!gender) {
        errors.push("Please select your gender.");
      }

      if (errors.length > 0) {
        alert("Errors:\n" + errors.join("\n"));
      } else {
        alert("Registration form submitted successfully!");
        registerForm.submit();
      }
    });
  }

  // Reservation form validation and dynamic deposit update
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    const restaurantSelect = reservationForm.restaurant;
    const depositAmount = reservationForm.depositAmount;
    const paymentMethod = reservationForm.paymentMethod;
    const voucherCodeBox = document.getElementById("voucherCodeBox");
    const creditCardBox = document.getElementById("creditCardBox");
    const creditCardNumber = reservationForm.creditCardNumber;
    const billingEmail = reservationForm.billingEmail;
    const email = reservationForm.email;
    const sameEmailCheckbox = document.getElementById("sameEmail");

    // Map restaurant name to deposit amount
    const restaurantDeposits = {};
    restaurants.forEach((r) => {
      restaurantDeposits[r.name] = r.deposit;
    });

    // Update deposit on restaurant change
    function updateDeposit() {
      const selected = restaurantSelect.value;
      if (restaurantDeposits[selected] !== undefined) {
        depositAmount.value = restaurantDeposits[selected];
      } else {
        depositAmount.value = "";
      }
    }

    restaurantSelect.addEventListener("change", updateDeposit);
    updateDeposit();

    // Show/hide payment fields
    paymentMethod.forEach((method) => {
      method.addEventListener("change", function () {
        if (this.value === "Voucher") {
          voucherCodeBox.style.display = "block";
          creditCardBox.style.display = "none";
        } else if (this.value === "Online") {
          voucherCodeBox.style.display = "none";
          creditCardBox.style.display = "block";
        }
      });
    });

    // Autofill billing email
    sameEmailCheckbox.addEventListener("change", function () {
      if (this.checked) {
        billingEmail.value = email.value;
        billingEmail.disabled = true;
      } else {
        billingEmail.value = "";
        billingEmail.disabled = false;
      }
    });

    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let errors = [];

      // Validate required fields
      if (!reservationForm.fullName.value.trim()) {
        errors.push("Full name is required.");
      }
      if (!reservationForm.email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservationForm.email.value.trim())) {
        errors.push("Valid email address is required.");
      }
      if (!/^\d{10,}$/.test(reservationForm.phone.value.trim())) {
        errors.push("Phone number must have at least 10 digits.");
      }
      const resDate = new Date(reservationForm.reservationDate.value + " " + reservationForm.reservationTime.value);
      if (isNaN(resDate.getTime()) || resDate < new Date()) {
        errors.push("Reservation date and time must be in the future.");
      }
      if (parseInt(reservationForm.numPeople.value, 10) <= 0) {
        errors.push("Number of people must be greater than 0.");
      }
      if (!reservationForm.restaurant.value) {
        errors.push("Please select a restaurant.");
      }

      // Payment method validation
      const payment = reservationForm.paymentMethod.value;
      if (payment === "Voucher") {
        if (!reservationForm.voucherCode.value.trim() || reservationForm.voucherCode.value.trim().length !== 12) {
          errors.push("Voucher code must be 12 digits.");
        }
      } else if (payment === "Online") {
        const cc = reservationForm.creditCardNumber.value.trim();
        if (!cc || !/^\d+$/.test(cc)) {
          errors.push("Credit card number must be digits only.");
        } else if (!(
          (cc.length === 16 && (cc.startsWith("4") || cc.startsWith("5"))) || // Visa/MC
          cc.length === 15 // Amex
        )) {
          errors.push("Credit card number must be 16 digits for Visa/MC or 15 digits for Amex.");
        }
      } else {
        errors.push("Please select a payment method.");
      }

      if (!reservationForm.billingEmail.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservationForm.billingEmail.value.trim())) {
        errors.push("Billing email must be a valid email address.");
      }

      if (errors.length > 0) {
        alert("Errors:\n" + errors.join("\n"));
      } else {
        alert("Reservation form submitted successfully!");
        reservationForm.submit();
      }
    });
  }
});
