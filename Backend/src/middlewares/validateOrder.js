export const validateOrder = (req, res, next) => {
  const { orderNumber, customer, items, totalPrice } = req.body;
  const errors = [];

  // Validera orderNumber, customer, items och totalPrice
  if (!orderNumber) {
    errors.push("Ordernummer är obligatoriskt");
  }

  if (!customer) {
    errors.push("Kund-ID är obligatoriskt");
  }

  if (!items || items.length === 0) {
    errors.push("Order måste innehålla minst 1 item");
  }

  if (!totalPrice || totalPrice < 0) {
    errors.push("Totalt pris är obligatoriskt och måste vara positivt");
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
