export function apiKeyAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  const clientKey = req.get("zenbu-key");
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "API key not configured on server",
    });
  }

  if (!clientKey) {
    return res.status(401).json({
      success: false,
      message: "API key required",
    });
  }

  if (clientKey !== apiKey) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
}
