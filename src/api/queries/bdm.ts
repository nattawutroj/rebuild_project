import {
  queryOptions,
  useMutation,
  keepPreviousData,
  UseMutationResult,
} from "@tanstack/react-query";
import { bdmClient } from "../apis/bdmClient";
import { CallReportsFilters, SelectItem } from "@/types/CallReports";
import { APIResponse } from "../baseClient";
import { Courses } from "@/types/Courses";

type UpdateStatusMutateType = UseMutationResult<
  APIResponse<unknown>,
  Error,
  string,
  unknown
>;
type DeleStatusMutateType = UseMutationResult<
  APIResponse<unknown>,
  Error,
  number,
  unknown
>;

const createListQueryOptions = <T extends Courses>(
  queryKey: (string | null)[],
  queryFn: () => Promise<APIResponse<T[]>>,
  options?: { enabled?: boolean; useValueAsId?: boolean },
) => {
  return queryOptions({
    queryKey,
    queryFn,
    select: (response: APIResponse<T[]>) =>
      response.data?.data.map((item:any) => ({
        label: item.courses_name,
        value: options?.useValueAsId ? item.courses_id : item.courses_name,
      })) ?? [],
    ...options,
  });
};

export const getCoursesQueryOptions = () =>
  createListQueryOptions<Courses>(["Courses"], () => bdmClient.getCourses(), {
    useValueAsId: true,
  });

// export const companyListQueryOptions = () =>
//   createListQueryOptions<SelectItem>(["companyList"], () =>
//     bdmClient.getCompanies(),
//   );

// export const callTypesListQueryOptions = () =>
//   createListQueryOptions<SelectItem>(["callTypesList"], () =>
//     bdmClient.getCallTypes(),
//   );

// export const consultantListQueryOptions = (companyId: string | null) =>
//   createListQueryOptions<SelectItem>(
//     ["consultantsList", companyId],
//     () => bdmClient.getConsultantsByCompany(companyId!),
//     {
//       enabled: !!companyId,
//     },
//   );

// export const clientListQueryOptions = (bostonId: string | null) =>
//   createListQueryOptions<SelectItem>(
//     ["clientsList", bostonId],
//     () => bdmClient.getClientsByBostonId(bostonId!),
//     { enabled: !!bostonId },
//   );

// export const useCallReportMutation = () => {
//   return useMutation({
//     mutationFn: (formData: FormData) => bdmClient.createCallReport(formData),
//   });
// };

// export const useReportUpdateMutation = (reportId: number) => {
//   return useMutation({
//     mutationFn: (formData: FormData) =>
//       bdmClient.updateCallReport(reportId, formData),
//   });
// };

// export const callReportListQueryOptions = (filters: CallReportsFilters) => {
//   const queryKey = [
//     "callReports",
//     filters.ConsultantIds,
//     filters.Status,
//     filters.StartDate,
//     filters.EndDate,
//     filters.PageSize,
//     filters.PageNumber,
//     filters,
//   ];

//   return queryOptions({
//     queryKey: queryKey,
//     queryFn: () => bdmClient.getCallReports(filters),
//     placeholderData: keepPreviousData,
//   });
// };

// export const callReportQueryOptions = (reportId: number | null) => {
//   return queryOptions({
//     queryKey: ["callReport", reportId],
//     queryFn: () => bdmClient.getCallReportById(reportId!),
//     enabled: !!reportId,
//   });
// };

// export const useCallReportUpdateStatusMutation = (
//   reportId: number | null,
// ): UpdateStatusMutateType => {
//   return useMutation({
//     mutationFn: (jsonData: string) =>
//       bdmClient.updateCallReportStatus(reportId!, jsonData),
//   });
// };

// export const useCallReportDeleteStatusMutation = (): DeleStatusMutateType => {
//   return useMutation({
//     mutationFn: (reportId: number) => bdmClient.deleteCallReport(reportId!),
//   });
// };
