"use strict";
import binSchema from "../database/binSchema";
import countryCodeToFlagEmoji from "./countryManager";

/**
 * The bin options.
 * @typedef {Object} BinOptions
 * @property {string} bin The bin.
 * @property {string} cardBrand The card brand.
 * @property {string} cardType The card type.
 * @property {string} cardLevel The card level.
 * @property {string} bankName The bank name.
 * @property {string} bankWebsite The bank website.
 * @property {string} bankPhone The bank phone.
 * @property {string} countryName The country name.
 * @property {string} countryCode The country code.
 * @property {string} countryIso3 The country iso3.
 * @property {string} currency The currency.
 * @example { bin: '999960' }
 * @example { cardBrand: 'VISA' }
 * @example { cardType: 'DEBIT' }
 * @example { cardLevel: 'CLASSIC' }
 */
interface BinOptions {
    bin?: string;
    cardBrand?: string;
    cardType?: string;
    cardLevel?: string;
    bankName?: string;
    bankWebsite?: string;
    bankPhone?: string;
    countryName?: string;
    countryCode?: string;
    countryIso3?: string;
    currency?: string;
};

/**
 * The bin filter options.
 * @typedef {Object} BinFilterOptions
 * @property {number} $limit The limit.
 * @property {number} $skip The skip.
 * @example { $limit: 10 }
 * @example { $skip: 10 }
 * @example { $limit: 10, $skip: 10 }
 */
interface BinFilterOptions {
    $limit?: number;
    $skip?: number;
};


/**
 * The bin response.
 * @typedef {Object} BinResponse
 * @property {string} bin The bin.
 * @property {Object} card The card.
 * @property {string} card.brand The card brand.
 * @property {string} card.type The card type.
 * @property {string} card.level The card level.
 * @property {Object} bank The bank.
 * @property {string} bank.name The bank name.
 * @property {string} bank.website The bank website.
 * @property {string} bank.phone The bank phone.
 * @property {Object} country The country.
 * @property {string} country.name The country name.
 * @property {string} country.code The country code.
 * @property {string} country.iso3 The country iso3.
 * @property {string} country.emoji The country emoji.
 * @property {string} currency The currency.
 */
interface BinResponse {
    bin: string | null | undefined;
    card: {
        brand: string | null | undefined;
        type: string | null | undefined;
        level: string | null | undefined;
    },
    bank: {
        name: string | null | undefined;
        website: string | null | undefined;
        phone: string | null | undefined;
    },
    country: {
        name: string | null | undefined;
        code: string | null | undefined;
        iso3: string | null | undefined;
        emoji: string | null | undefined;
    },
    currency: string | null | undefined;
};

/**
 * A class that manages the bin database.
 * @type {BinManager}
 * @property {typeof binSchema} database The bin database.
 * @method {Promise<BinOptions>} findBin Finds a bin in the database.
 * @method {Promise<BinOptions[]>} findBins Finds bins in the database.
 * @method {Promise<boolean>} createBin Creates a bin in the database.
 * @method {Promise<boolean>} updateBin Updates a bin in the database.
 * @method {Promise<boolean>} deleteBin Deletes a bin in the database.
 * @exports BinManager
 * @example import bin from 'binfo';
 */
class BinManager {
    private database: typeof binSchema;
  constructor() {
    this.database = binSchema;
  };


  /**
   * Finds a bin in the database.
   * @param {BinOptions} binOptions The bin options to find.
   * @returns {Promise<BinOptions|{}>} The bin found.
   * @example await bin.findBin({ bin: '999960' });
   * @example await bin.findBin({ cardBrand: 'VISA' });
   * @example await bin.findBin({ cardType: 'DEBIT' });
   * @example await bin.findBin({ cardLevel: 'CLASSIC' });
   * @example await bin.findBin({ bankName: 'BANK' });
   * @example await bin.findBin({ bankWebsite: 'https://bank.com' });
   * @example await bin.findBin({ bankPhone: '+1234567890' });
   * @example await bin.findBin({ countryName: 'COUNTRY' });
   * @example await bin.findBin({ countryCode: 'CC' });
   * @example await bin.findBin({ countryIso3: 'CCC' });
   * @example await bin.findBin({ currency: 'USD' });
   */
  async findBin(binOptions?: BinOptions): Promise<BinResponse> {
    if(!binOptions) binOptions = {};
    return this.database.findOne(binOptions).then((result) => {
        return {
            bin: result?.bin,
            card: {
                brand: result?.cardBrand,
                type: result?.cardType,
                level: result?.cardLevel
            },
            bank: {
                name: result?.bankName,
                website: result?.bankWebsite,
                phone: result?.bankPhone
            },
            country: {
                name: result?.countryName,
                code: result?.countryCode,
                iso3: result?.countryIso3,
                emoji: countryCodeToFlagEmoji(result?.countryCode as string)
            },
            currency: result?.currency
        }
    });
  };


  /**
   * Finds bins in the database.
   * @param {BinOptions} binOptions The bin options to find.
   * @param {BinFilterOptions} binFilterOptions The bin filter options to find.
   * @returns {Promise<BinOptions[]>} The bins found.
   * @example await bin.findBins({ bin: '999960' });
   * @example await bin.findBins({ cardBrand: 'VISA' });
   * @example await bin.findBins({ cardType: 'DEBIT' });
   * @example await bin.findBins({ cardLevel: 'CLASSIC' });
   * @example await bin.findBins({ bankName: 'BANK' });
   * @example await bin.findBins({ bankWebsite: 'https://bank.com' });
   * @example await bin.findBins({ bankPhone: '+1234567890' });
   * @example await bin.findBins({ countryName: 'COUNTRY' });
   * @example await bin.findBins({ countryCode: 'CC' });
   * @example await bin.findBins({ countryIso3: 'CCC' });
   * @example await bin.findBins({ currency: 'USD' });
   * @example await bin.findBins({},{ $limit: 10 });
   * @example await bin.findBins({},{ $skip: 10 });
   * @example await bin.findBins({ bin: '999960' },{ $limit: 10 });
   */
  async findBins(binOptions?: BinOptions, binFilterOptions?: BinFilterOptions): Promise<BinResponse[]> {
    if(!binOptions) binOptions = {};
    if(!binFilterOptions) binFilterOptions = {};
    return this.database.find(binOptions, binFilterOptions).then((result) => {
        return result.map((bin) => {
            return {
                bin: bin.bin ?? '',
                card: {
                    brand: bin.cardBrand ?? '',
                    type: bin.cardType ?? '',
                    level: bin.cardLevel ?? ''
                },
                bank: {
                    name: bin.bankName ?? '',
                    website: bin.bankWebsite ?? '',
                    phone: bin.bankPhone ?? ''
                },
                country: {
                    name: bin.countryName ?? '',
                    code: bin.countryCode ?? '',
                    iso3: bin.countryIso3 ?? '',
                    emoji: countryCodeToFlagEmoji(bin.countryCode ?? '')
                },
                currency: bin.currency ?? ''
            }
        });
    }).catch((error) => {
        return [];
    });
  };



    /**
     * Creates a bin in the database.
     * @param {BinOptions} binOptions The bin options to create.
     * @returns {Promise<boolean>} The bin created.
     * @example await bin.createBin({ bin: '999960', cardBrand: 'VISA', cardType: 'DEBIT', cardLevel: 'CLASSIC', bankName: 'BANK', bankWebsite: 'https://bank.com', bankPhone: '+1234567890', countryName: 'COUNTRY', countryCode: 'CC', countryIso3: 'CCC', currency: 'USD' });
     */
  async createBin(binOptions: BinOptions): Promise<boolean> {
    return this.database.findOneAndUpdate(binOptions,{ $set: binOptions },{ $upsert: true }).then((result) => {
        return true;
    }).catch((error) => {
        return false;
    });
  };


    /**
     * Updates a bin in the database.
     * @param {BinOptions} findBinOptions The bin options to find.
     * @param {BinOptions} updateBinOptions The bin options to update.
     * @returns {Promise<boolean>} The bin updated.
     * @example await bin.updateBin({ bin: '999960' },{ cardBrand: 'VISA', cardType: 'DEBIT', cardLevel: 'CLASSIC', bankName: 'BANK', bankWebsite: 'https://bank.com', bankPhone: '+1234567890', countryName: 'COUNTRY', countryCode: 'CC', countryIso3: 'CCC', currency: 'USD' });
     */
  async updateBin(findBinOptions: BinOptions, updateBinOptions: BinOptions): Promise<boolean> {
    return this.database.findOneAndUpdate(findBinOptions,{ $set: updateBinOptions },{ $upsert: true }).then((result) => {
        return true;
    }).catch((error) => {
        return false;
    });
  };


    /**
     * Deletes a bin in the database.
     * @param {BinOptions} binOptions The bin options to delete.
     * @returns {Promise<boolean>} The bin deleted.
     * @example await bin.deleteBin({ bin: '999960' });
     */
  async deleteBin(binOptions: BinOptions): Promise<boolean> {
    return this.database.findOneAndDelete(binOptions).then((result) => {
        return true;
    }).catch((error) => {
        return false;
    });
  };

};

export default new BinManager();