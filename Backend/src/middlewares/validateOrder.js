export const validateOrder = (req, res, next) => {
  const { customer, items, totalPrice, paymentMethod } = req.body;
  const errors = [];

  if (!customer) {
    errors.push("Customer must be provided");
  }

  if (!items || items.length === 0) {
    errors.push("Items must be more than 0");
  }

  if (!paymentMethod) {
    errors.push("Payment method must be provided");
  }

  if (!totalPrice || totalPrice < 0) {
    errors.push("Total price of order must be provided");
  }

  // Om det uppstår fel, returnera dem
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Valideringsfel, se errors för detaljer",
      errors: errors,
    });
  }

  next();
};
