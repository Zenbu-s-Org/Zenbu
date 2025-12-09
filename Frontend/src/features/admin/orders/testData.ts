export const testData = [
  {
    orderNumber: "ZB-1001",
    customer: "guest",
    items: [
      {
        id: "p1",
        name: "Tokyo Sunrise",
        qty: 1,
        price: 129,
        ingredients: [
          { id: "i1", name: "Salmon" },
          { id: "i2", name: "Avocado" },
          { id: "i3", name: "Spicy Mayo" },
        ],
      },
      {
        id: "p4",
        name: "Kyoto Green",
        qty: 2,
        price: 109,
        ingredients: [
          { id: "i4", name: "Cucumber" },
          { id: "i5", name: "Sesame Seeds" },
          { id: "i6", name: "Seaweed" },
        ],
      },
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
      {
        id: "p5",
        name: "Seoul Sister",
        qty: 1,
        price: 139,
        ingredients: [
          { id: "i7", name: "Beef" },
          { id: "i8", name: "Kimchi" },
          { id: "i9", name: "Gochujang" },
        ],
      },
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
      {
        id: "p2",
        name: "Shanghai Beef",
        qty: 1,
        price: 149,
        ingredients: [
          { id: "i7", name: "Beef" },
          { id: "i10", name: "Garlic" },
          { id: "i11", name: "Sweet Soy" },
        ],
      },
      {
        id: "p1",
        name: "Tokyo Sunrise",
        qty: 1,
        price: 129,
        ingredients: [
          { id: "i1", name: "Salmon" },
          { id: "i2", name: "Avocado" },
          { id: "i3", name: "Spicy Mayo" },
        ],
      },
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
      {
        id: "p3",
        name: "Osaka Fire",
        qty: 3,
        price: 119,
        ingredients: [
          { id: "i12", name: "Tuna" },
          { id: "i3", name: "Spicy Mayo" },
          { id: "i13", name: "Tempura Flakes" },
        ],
      },
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
      {
        id: "p4",
        name: "Kyoto Green",
        qty: 1,
        price: 109,
        ingredients: [
          { id: "i4", name: "Cucumber" },
          { id: "i5", name: "Sesame Seeds" },
          { id: "i6", name: "Seaweed" },
        ],
      },
    ],
    totalPrice: 109,
    paymentMethod: "cash",
    status: "pending",
    createdAt: "2025-02-01T12:42:20.000Z",
  },
];