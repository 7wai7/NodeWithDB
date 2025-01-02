import mongoose from 'mongoose';

const schemaDefinition = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    fields: {
      type: Object,
      required: true,
      validate: {
        validator: function (value) {
          // Перевірка, чи є у об'єкті хоча б один ключ
          if (Object.keys(value).length === 0) {
            throw new Error("Incorrect keys");
          }

          try {
            new mongoose.Schema(value);
            return true;
          } catch {
            return false;
          }
        }
      },
    },    
    useTimestamps: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const SchemaDefinition = mongoose.model("SchemaDefinition", schemaDefinition);

const createDynamicModel = (schemaDefinition) => {
  const { name, fields, useTimestamps } = schemaDefinition;

  if (mongoose.models[name]) {
    return mongoose.models[name];
  }

  const schema = new mongoose.Schema(fields, { timestamps: useTimestamps });
  return mongoose.model(name, schema);
};

const getSchemaModel = async (schemaName) => {
  const schemaDefinition = await SchemaDefinition.findOne({ name: schemaName });
  if (!schemaDefinition) throw new Error("Schema not found");

  return createDynamicModel(schemaDefinition);
}

const getAllSchemaModels = async () => {
  const models = [];
  const schemaDefinitionArr = await SchemaDefinition.find();

  for (const schemaDefinition of schemaDefinitionArr) {
    const model = createDynamicModel(schemaDefinition);
    models.push(model);
  }

  return models;
}

/* const addDynamicField = (fieldName, type) => {
  assetSchema.add({ [fieldName]: { type, default: null } });
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}; */
// propertyName = "age"
// propertyType = "Number"
// 
// addDynamicField(propertyName, propertyType);

export { SchemaDefinition, createDynamicModel, getSchemaModel, getAllSchemaModels };
