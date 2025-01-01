import mongoose from 'mongoose';

const SchemaDefinition = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    fields: {
      type: Object,
      required: true,
      validate: {
        validator: function (value) {
          // Перевірка, чи є у об'єкті хоча б один ключ
          if (Object.keys(value).length === 0) {
            return false;
          }

          try {
            new mongoose.Schema(value);
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

const getAllModel = async () => {
  const models = [];
  const schemaDefinitionArr = await SchemaModel.find();

  for (const schemaDefinition of schemaDefinitionArr) {
    const model = createDynamicModel(schemaDefinition);
    models.push(model);
  }

  return models;
}

const addDynamicField = (fieldName, type) => {
  assetSchema.add({ [fieldName]: { type, default: null } });
};
// propertyName = "age"
// propertyType = "Number"
// 
// addDynamicField(propertyName, propertyType);

export { SchemaModel, createDynamicModel, getModel, getAllModel };
