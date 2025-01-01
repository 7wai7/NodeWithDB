import mongoose from 'mongoose';

const convert = {
  String: String,
  Number: Number,
  Boolean: Boolean,
  Date: Date,
  Array: Array,
  ObjectId: mongoose.ObjectId,
  true: true,
  false: false 
}

const SchemaDefinition = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    fields: {
      type: Object,
      required: true,
      validate: {
        validator: function (value) {
          try {
            const schema = new mongoose.Schema(value);

            for (const key in value) {
              const field = value[key];

              for (const keyField in field) {
                console.log(field[keyField]);

                const v = field[keyField];
                field[keyField] = convert[v];
              }
              console.log(field);
              
            }
            return true;
          } catch {
            return false;
          }
        },
        message: "Invalid schema definition in 'fields'.",
      },
    },    
    useTimestamps: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const SchemaModel = mongoose.model("SchemaDefinition", SchemaDefinition);

const createDynamicModel = (schemaDefinition) => {
  const { name, fields, useTimestamps } = schemaDefinition;

  if (mongoose.models[name]) {
    return mongoose.models[name];
  }

  const schema = new mongoose.Schema(fields, { timestamps: useTimestamps });
  return mongoose.model(name, schema);
};

const getModel = async (schemaName) => {
  const schemaDefinition = await SchemaModel.findOne({ name: schemaName });
  if (!schemaDefinition) throw new Error("Schema not found");

  return createDynamicModel(schemaDefinition);
}

const addDynamicField = (fieldName, type) => {
  assetSchema.add({ [fieldName]: { type, default: null } });
};
// propertyName = "age"
// propertyType = "Number"
// 
// addDynamicField(propertyName, propertyType);

export { SchemaModel, createDynamicModel, getModel };
