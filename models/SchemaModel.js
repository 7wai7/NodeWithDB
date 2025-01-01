import mongoose from 'mongoose';

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
              if (!['String', 'Number', 'Boolean', 'Date', 'Array', 'ObjectId'].includes(field.type.name)) {
                throw new Error(`Invalid field type: ${field.type.name}`);
              }
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

module.exports = { SchemaModel, createDynamicModel, getModel };