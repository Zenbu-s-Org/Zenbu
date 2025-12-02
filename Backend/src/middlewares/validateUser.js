export const validateUser = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  // Validera name
  if (!name) {
    errors.push("Namn är obligatoriskt");
  } else if (name.trim().length < 4) {
    errors.push("Namn måste vara minst 4 tecken");
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email är obligatoriskt");
  } else if (!emailRegex.test(email)) {
    errors.push("Email är inte giltig");
  }


  if (!password) {
    errors.push("Lösenord är obligatoriskt");
  } else if (password.length < 8) {
    errors.push("Lösenord måste vara minst 8 tecken");
  }

 
  if (role && !["customer", "admin"].includes(role)) {
    errors.push("Roll måste vara customer eller admin");
  }

  // Om fel finns, returnera dem
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Valideringsfel, se errors för detaljer",
      errors: errors,
    });
  }

  // Allt ok, fortsätt till nästa middleware/route
  next();
};
