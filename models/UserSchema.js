const mongoose = require("mongoose");
const { Schema } = mongoose;

const assetSchema = new Schema(
  { name: { type: String, required: true } },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Asset = mongoose.model("Asset", assetSchema);

const addDynamicField = (fieldName, type) => {
  assetSchema.add({ [fieldName]: { type, default: null } });
};

module.exports = { Asset, addDynamicField };

// propertyName = "age"
// propertyType = "Number"
// 
// addDynamicField(propertyName, propertyType);