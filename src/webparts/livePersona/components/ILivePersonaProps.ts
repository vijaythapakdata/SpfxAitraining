import { WebPartContext } from "@microsoft/sp-webpart-base";
import {MSGraphClientV3} from "@microsoft/sp-http";
export interface ILivePersonaProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  graphClient:MSGraphClientV3;
}
