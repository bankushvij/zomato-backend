import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    orderdetail: [
      {
        food: [{ type: mongoose.Types.ObjectId, ref: "Foods" }],
        quantity: { type: Number, required: true },
        paymode: { type: String, required: true },
        status: { type: String, default: "placed" },
        paymentdetails: {
          itemtotal: { type: Number, required: true },
          promo: { type: Number, required: true },
          tax: { type: Number, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.models['Order'] || mongoose.model("Order", OrderSchema);
