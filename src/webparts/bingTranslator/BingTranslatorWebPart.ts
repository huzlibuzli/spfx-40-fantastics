/**
 * @file
 * Bing Translator Web Part for SharePoint Framework SPFx
 *
 * Author: Olivier Carpentier
 * Copyright (c) 2016
 */
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  PropertyPaneDropdown,
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import * as strings from 'BingTranslatorStrings';
import { IBingTranslatorWebPartProps } from './IBingTranslatorWebPartProps';
import ModuleLoader from '@microsoft/sp-module-loader';

//Imports property pane custom fields
import { PropertyFieldColorPicker } from 'sp-client-custom-fields/lib/PropertyFieldColorPicker';

export default class BingTranslatorWebPart extends BaseClientSideWebPart<IBingTranslatorWebPartProps> {

  private guid: string;

  /**
   * @function
   * Web part contructor.
   */
  public constructor(context: IWebPartContext) {
    super(context);

    this.guid = this.getGuid();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyChanged = this.onPropertyChanged.bind(this);
  }

  /**
   * @function
   * Renders HTML code
   */
  public render(): void {

    //Define the main DIV container
    var html = `
    <div id='MicrosoftTranslatorWidget' class='${this.properties.theme}' style='color:${this.properties.color};background-color:${this.properties.backgroundColor}'></div>
    `;
    this.domElement.innerHTML = html;
    //Loads the microsoft translator JavaScript from CDN
    ModuleLoader.loadScript('//www.microsofttranslator.com/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=False&ui=true&settings=' + this.properties.start + '&from=' + this.properties.language, 'bingtranslator').then((): void => {
    });
  }

  /**
   * @function
   * Generates a GUID
   */
  private getGuid(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  /**
   * @function
   * Generates a GUID part
   */
  private s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  /**
   * @function
   * PropertyPanel settings definition
   */
  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: false,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('theme', {
                  label: strings.theme,
                  options: [
                    {key: 'Dark', text: 'Dark'},
                    {key: 'Light', text: 'Light'}
                  ]
                }),
                PropertyPaneDropdown('start', {
                  label: strings.start,
                  options: [
                    {key: 'Manual', text: 'Manual'},
                    {key: 'Auto', text: 'Auto'}
                  ]
                }),
                PropertyPaneDropdown('language', {
                  label: strings.language,
                  options: [
                    {key: '', text: 'Auto Detect'},
                    {key: 'af', text: 'Afrikaans'},
                    {key: 'ar', text: 'Arabic'},
                    {key: 'bs-Latn', text: 'Bosnian (latin)'},
                    {key: 'bg', text: 'Bulgarian'},
                    {key: 'ca', text: 'Catalan'},
                    {key: 'zh-CHS', text: 'Simplified Chinese'},
                    {key: 'zh-CHT', text: 'Traditional Chinese'},
                    {key: 'yue', text: 'Cantonese (traditional)'},
                    {key: 'hr', text: 'Croatian'},
                    {key: 'cs', text: 'Czech'},
                    {key: 'da', text: 'Danish'},
                    {key: 'nl', text: 'Dutch'},
                    {key: 'en', text: 'English'},
                    {key: 'et', text: 'Estonian'},
                    {key: 'fj', text: 'Fijian'},
                    {key: 'fil', text: 'Filipino'},
                    {key: 'fi', text: 'Finnish'},
                    {key: 'fr', text: 'French'},
                    {key: 'de', text: 'German'},
                    {key: 'el', text: 'Greek'},
                    {key: 'ht', text: 'Haitian'},
                    {key: 'he', text: 'Hebrew'},
                    {key: 'hi', text: 'Hindi'},
                    {key: 'mww', text: 'Hmong daw'},
                    {key: 'hu', text: 'Hungarian'},
                    {key: 'id', text: 'Indonesian'},
                    {key: 'it', text: 'Italian'},
                    {key: 'ja', text: 'Japanese'},
                    {key: 'sw', text: 'Swahili'},
                    {key: 'tlh', text: 'Klingon'},
                    {key: 'ko', text: 'Korean'},
                    {key: 'lv', text: 'Latvian'},
                    {key: 'lt', text: 'Lithuanian'},
                    {key: 'mg', text: 'Malagasy'},
                    {key: 'ms', text: 'Malay'},
                    {key: 'mt', text: 'Maltese'},
                    {key: 'yua', text: 'Yucatec Maya'},
                    {key: 'no', text: 'Norvegian'},
                    {key: 'otq', text: 'Querétaro Otomi'},
                    {key: 'fa', text: 'Perse '},
                    {key: 'pl', text: 'Polish'},
                    {key: 'pt', text: 'Portuguese'},
                    {key: 'ro', text: 'Romanian'},
                    {key: 'ru', text: 'Russian'},
                    {key: 'sm', text: 'Samoan'},
                    {key: 'sr-Cyrl', text: 'Serbian (Cyrillic)'},
                    {key: 'sr-Latn', text: 'Serbian (latin)'},
                    {key: 'sk', text: 'Slovak'},
                    {key: 'sl', text: 'Slovenian'},
                    {key: 'es', text: 'Spanish'},
                    {key: 'sv', text: 'Swedish'},
                    {key: 'ty', text: 'Tahitian'},
                    {key: 'th', text: 'Thai'},
                    {key: 'to', text: 'Tongan'},
                    {key: 'tr', text: 'Turkish'},
                    {key: 'uk', text: 'Ukrainian'},
                    {key: 'ur', text: 'Urdu'},
                    {key: 'vi', text: 'Vietnamese'},
                    {key: 'cy', text: 'Welsh'}
                  ]
                }),
                PropertyFieldColorPicker('color', {
                  label: strings.color,
                  initialColor: this.properties.color,
                  onPropertyChange: this.onPropertyChanged,
                  properties: this.properties
                }),
                PropertyFieldColorPicker('backgroundColor', {
                  label: strings.backgroundColor,
                  initialColor: this.properties.backgroundColor,
                  onPropertyChange: this.onPropertyChanged,
                  properties: this.properties
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
