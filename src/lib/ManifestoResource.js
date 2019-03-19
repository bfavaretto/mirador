import { LabelValuePair } from 'manifesto.js';

/**
 * ManifestoResource - wraps Manifesto's Resource class
 */
export default class ManifestoResource {
  /**
   * @param {IIIFResource} canvas
   */
  constructor(resource) {
    this.resource = resource;
  }

  /**
   * Improved version of getMetadata to support multilingual metadata
   */
  getMetadata(locale = undefined) {
    if (locale === undefined) return this.resource.getMetadata();

    const resourceMetadata = this.resource.getProperty('metadata');

    const metadata = [];

    if (!resourceMetadata) return metadata;

    for (let i = 0; i < resourceMetadata.length; i += 1) {
      const item = resourceMetadata[i];
      const metadataItem = new LabelValuePair(locale || this.resource.options.locale);
      metadataItem.parse(item);
      metadata.push(metadataItem);
    }

    return metadata;
  }

  /**
   * Get the locales present in the manifest
   */
  getLocales() {
    const metadata = this.resource.getProperty('metadata');
    if (!metadata) return [];

    const languages = {};

    for (let i = 0; i < metadata.length; i += 1) {
      const item = metadata[i];
      ManifestoResource.getLocalesForStructure(item.label).forEach((l) => { languages[l] = true; });
      ManifestoResource.getLocalesForStructure(item.value).forEach((l) => { languages[l] = true; });
    }
    return Object.keys(languages);
  }

  /** @private */
  static getLocalesForStructure(item) {
    const languages = [];

    if (Array.isArray(item)) {
      languages.push(...item.filter(i => (typeof i === 'object' && i['@language'])).map(i => i['@language']));
    } else if (typeof item === 'object') {
      if (item['@language']) languages.push(item['@language']);
    }

    return languages;
  }
}
