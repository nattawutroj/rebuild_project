/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from "@/components/ui/multiselect";
import { BaseOption, CallReport, FormValues } from "@/types/CallReports";

export const mapCallReportToFormValues = (
  callReport: CallReport,
): FormValues => {
  const taggedClients = callReport?.clientDiscussed?.split(",");
  const callStart = callReport?.startTime as unknown;
  const callEnd = callReport?.endTime as unknown;
  const anticipatedDate = callReport?.anticipatedDate as unknown;
  const nextCallDate = callReport?.nextCallDate as unknown;

  return {
    bdm: callReport.bdmName || "",
    company: callReport.companyInfoId?.toString() || "",
    consultant: callReport.recipientId?.toString() || "",
    callStart: new Date(callStart as string),
    callEnd: new Date(callEnd as string),
    callType: callReport.callType || "",
    phoneNumber: callReport.telephoneNo || "",
    reasonForCall: callReport.reason || "",
    tagClients: taggedClients ?? [],
    prospectiveClients: callReport.prospectsClients ? "true" : "false",
    prospectiveClientNames: callReport.prospectsClients ?? "",
    pointsDiscussed: callReport.pointsDiscussed || "",
    nextCallDate: new Date(nextCallDate as string),
    businessIdentified: callReport.businessIdentfied ? "true" : "false",
    gbp: String(callReport.gbpamount),
    usd: String(callReport.usdamount),
    eur: String(callReport.euramount),
    other: callReport?.otherAmount,
    // other: Number(callReport?.otherAmount),
    anticipatedBusinessDate: new Date(anticipatedDate as string),
    attachments: undefined,
  };
};

export const transformFetchData = (
  CoursesListResult: any,
) => {
  const coursesList = {
    data: CoursesListResult.data as BaseOption[],
    isPending: CoursesListResult.isPending,
  };

  return [coursesList];
};

export const convertToFormData = (values: FormValues): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "boolean") {
      formData.append(key, String(value));
    }
  });

  (["gbp", "usd", "eur", "other"] as const).forEach((key) => {
    const value =
      values[key as keyof Pick<FormValues, "gbp" | "usd" | "eur" | "other">];
    if (value !== undefined) formData.append(key, value.toString());
  });

  (
    ["callStart", "callEnd", "nextCallDate", "anticipatedBusinessDate"] as const
  ).forEach((key) => {
    const value =
      values[
        key as keyof Pick<
          FormValues,
          "callStart" | "callEnd" | "nextCallDate" | "anticipatedBusinessDate"
        >
      ];
    if (value instanceof Date) formData.append(key, value.toISOString());
  });

  const tagClientsString = values?.tagClients?.join(",");
  formData.append("tagClients", tagClientsString);

  return formData;
};
