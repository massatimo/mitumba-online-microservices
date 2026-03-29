const orderSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  size: { type: String, enum: ['S','M','L','XL','XXL'] },
  brand: String,
  condition: { type: String, enum: ['New', 'Gently Used', 'Used', 'Fagi'] },
  images: [String],
  vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
  stock: { type: Number, default: 1 }
});