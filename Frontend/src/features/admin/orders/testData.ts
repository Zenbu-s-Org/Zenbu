

export const testData = [
  {
    orderNumber: "ZB-1001",
    customer: "guest",
    items: [
      { id: "p1", name: "Tokyo Sunrise", qty: 1, price: 129 },
      { id: "p4", name: "Kyoto Green", qty: 2, price: 109 },
    ],
    totalPrice: 347,
    paymentMethod: "swish",
    status: "pending",
    createdAt: "2025-02-01T12:10:00.000Z",
  },
  {
    orderNumber: "ZB-1002",
    customer: "6794abf4fc11cd45a1d23567",
    items: [
      { id: "p5", name: "Seoul Sister", qty: 1, price: 139 },
    ],
    totalPrice: 139,
    paymentMethod: "visa",
    status: "preparing",
    createdAt: "2025-02-01T12:15:30.000Z",
  },
  {
    orderNumber: "ZB-1003",
    customer: "guest",
    items: [
      { id: "p2", name: "Shanghai Beef", qty: 1, price: 149 },
      { id: "p1", name: "Tokyo Sunrise", qty: 1, price: 129 },
    ],
    totalPrice: 278,
    paymentMethod: "mastercard",
    status: "ready",
    createdAt: "2025-02-01T12:21:10.000Z",
  },
  {
    orderNumber: "ZB-1004",
    customer: "6794abf4fc11cd45a1d23567",
    items: [
      { id: "p3", name: "Osaka Fire", qty: 3, price: 119 },
    ],
    totalPrice: 357,
    paymentMethod: "swish",
    status: "preparing",
    createdAt: "2025-02-01T12:30:55.000Z",
  },
  {
    orderNumber: "ZB-1005",
    customer: "guest",
    items: [
      { id: "p4", name: "Kyoto Green", qty: 1, price: 109 },
    ],
    totalPrice: 109,
    paymentMethod: "cash",
    status: "pending",
    createdAt: "2025-02-01T12:42:20.000Z",
  },
];