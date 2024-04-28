export const defaultValues = {
  bdm: "",
  company: "",
  consultant: "",
  callStart: undefined,
  callEnd: undefined,
  callType: "",
  phoneNumber: "",
  reasonForCall: "",
  tagClients: [],
  prospectiveClients: "",
  prospectiveClientNames: "",
  pointsDiscussed: "",
  nextCallDate: undefined,
  businessIdentified: "",
  gbp: undefined,
  usd: undefined,
  eur: undefined,
  other: undefined,
  anticipatedBusinessDate: undefined,
  attachments: undefined,
};

export const defaultCallReportFilters = {
  ConsultantId: undefined,
  Status: undefined,
  StartDate: undefined,
  EndDate: undefined,
  PageSize: 10,
  PageNumber: 1,
};

export enum StatusesReport {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
}
