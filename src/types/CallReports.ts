/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from "@/components/ui/multiselect";

export type FormValues = {
  bdm: string;
  company: string;
  consultant: string;
  callStart: Date | undefined;
  callEnd: Date | undefined;
  callType: string;
  reasonForCall: string;
  tagClients: any[];
  phoneNumber: string;
  prospectiveClients: string;
  prospectiveClientNames: string;
  pointsDiscussed: string;
  nextCallDate: Date | undefined;
  businessIdentified: string;
  gbp: string | undefined;
  usd: string | undefined;
  eur: string | undefined;
  other: string | undefined;
  anticipatedBusinessDate: Date | undefined;
  attachments: FileList | undefined;
};

export interface BaseOption {
  label: string;
  value: string;
}

export interface MultiSelectOption extends BaseOption {
  disable?: boolean;
  fixed?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface SelectItem {
  id: string;
  text: string;
  value: string;
}

export interface ListData {
  data: BaseOption[] | Option[];
  isPending: boolean;
}

export interface CallReportRequest {
  ConsultantIds?: number[];
  Status?: string;
  StartDate?: string;
  EndDate?: string;
  PageSize?: number;
  PageNumber?: number;
}

export interface CallReport {
  reportId: number;
  companyInfoId?: number;
  recipientId: number;
  pointsDiscussed: string;
  startTime?: Date;
  endTime?: Date;
  nextCallDate?: Date;
  anticipatedDate?: Date;
  callType: string;
  bdmName: string;
  businessIdentfied?: boolean;
  usdamount?: string;
  gbpamount?: string;
  euramount?: string;
  otherAmount?: string;
  reason: string;
  prospectsClients?: string;
  clientDiscussed?: string;
  attachedFile?: string;
  telephoneNo?: string;
  emailAddress?: string;
  status?: boolean;
  statusText?: string;
  remarks?: string;
  consultantName?: string;
  companyName?: string;
}

export interface PaginationResult<T> {
  data: T[];
  totalCount: number;
}

export interface CallReportsFilters {
  ConsultantIds?: number[];
  Status?: string;
  StartDate?: string;
  EndDate?: string;
  PageSize?: number;
  PageNumber?: number;
}

export type CallReportRequestParams = {
  "Data.Status"?: string;
  "Data.StartDate"?: string;
  "Data.EndDate"?: string;
  PageSize: number;
  PageNumber: number;
  [key: string]: string | number | undefined;
};
