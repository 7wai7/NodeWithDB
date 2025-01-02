import mongoose from 'mongoose';

// Загальна колекція для документів без схеми
const GeneralCollection = mongoose.model(
    "GeneralCollection",
    new mongoose.Schema(
      {
        originalSchema: { type: String, required: true }, // Назва схеми, з якої перенесено
        documentData: { type: Object, required: true },  // Сам документ
        movedAt: { type: Date, default: Date.now }      // Час перенесення
      }
    )
  );


export default GeneralCollection;