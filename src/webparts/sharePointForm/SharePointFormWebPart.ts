import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SharePointFormWebPartStrings';
import SharePointForm from './components/SharePointForm';
import { ISharePointFormProps } from './components/ISharePointFormProps';
import GetChoiceValueClassApi from '../../CommonMethods/ChoiceServiceApi';
export interface ISharePointFormWebPartProps {
  description: string;
}

export default class SharePointFormWebPart extends BaseClientSideWebPart<ISharePointFormWebPartProps> {
  private choiceClassService:GetChoiceValueClassApi
protected async onInit(): Promise<void> {
  this.choiceClassService=new GetChoiceValueClassApi(this.context);
  return super.onInit();
}

  public async render(): Promise<void> {
    const element: React.ReactElement<ISharePointFormProps> = React.createElement(
      SharePointForm,
      {
    context:this.context,
    siteurl:this.context.pageContext.web.absoluteUrl,
    dropdownoptions:await this.choiceClassService.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Department"),
    genderoptions:this.choiceClassService.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Gender"),
    skillsoptions:this.choiceClassService.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Skills"),
    citiesoptions:this.choiceClassService.getLookupChoices()

      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
