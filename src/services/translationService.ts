import { LANGUAGES } from '../config/constants';

// Basic medical terms dictionary for demo purposes
const MEDICAL_DICTIONARY = {
  en: {
    "hello": { es: "hola", fr: "bonjour", de: "hallo", zh: "你好", ja: "こんにちは" },
    "how are you feeling": { es: "cómo se siente", fr: "comment vous sentez-vous", de: "wie fühlen Sie sich", zh: "你感觉怎么样", ja: "調子はどうですか" },
    "pain": { es: "dolor", fr: "douleur", de: "Schmerz", zh: "疼痛", ja: "痛み" },
    "headache": { es: "dolor de cabeza", fr: "mal de tête", de: "Kopfschmerzen", zh: "头痛", ja: "頭痛" },
    "fever": { es: "fiebre", fr: "fièvre", de: "Fieber", zh: "发烧", ja: "熱" },
    "medicine": { es: "medicina", fr: "médicament", de: "Medizin", zh: "药物", ja: "薬" },
    "doctor": { es: "médico", fr: "médecin", de: "Arzt", zh: "医生", ja: "医師" },
    "hospital": { es: "hospital", fr: "hôpital", de: "Krankenhaus", zh: "医院", ja: "病院" },
    "emergency": { es: "emergencia", fr: "urgence", de: "Notfall", zh: "急诊", ja: "救急" },
    "prescription": { es: "receta", fr: "ordonnance", de: "Rezept", zh: "处方", ja: "処方箋" },
    "symptoms": { es: "síntomas", fr: "symptômes", de: "Symptome", zh: "症状", ja: "症状" },
    "treatment": { es: "tratamiento", fr: "traitement", de: "Behandlung", zh: "治疗", ja: "治療" },
    "blood pressure": { es: "presión arterial", fr: "tension artérielle", de: "Blutdruck", zh: "血压", ja: "血圧" },
    "heart rate": { es: "frecuencia cardíaca", fr: "fréquence cardiaque", de: "Herzfrequenz", zh: "心率", ja: "心拍数" },
    "temperature": { es: "temperatura", fr: "température", de: "Temperatur", zh: "体温", ja: "体温" }
  }
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  if (!text.trim()) return '';

  // Convert text to lowercase for dictionary matching
  const words = text.toLowerCase().split(/\s+/);
  const translatedWords = words.map(word => {
    // Check if the word or phrase exists in our medical dictionary
    const translation = MEDICAL_DICTIONARY.en[word]?.[targetLanguage as keyof typeof MEDICAL_DICTIONARY.en[keyof typeof MEDICAL_DICTIONARY.en]];
    return translation || word;
  });

  // Capitalize first letter of the sentence
  translatedWords[0] = translatedWords[0].charAt(0).toUpperCase() + translatedWords[0].slice(1);

  return translatedWords.join(' ');
};

export default translateText;