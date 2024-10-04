import { Schema, Model } from 'cherry3';

export default new Model('binlist',Schema({
    bin: { type: String, required: true },
    cardBrand: { type: String, required: true },
    cardType: { type: String, required: true },
    cardLevel: { type: String, required: true },
    bankName: { type: String, required: true },
    bankWebsite: { type: String, required: true },
    bankPhone: { type: String, required: true },
    countryName: { type: String, required: true },
    countryCode: { type: String, required: true },
    countryIso3: { type: String, required: true },
    currency: { type: String, required: true }
}));