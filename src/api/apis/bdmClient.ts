import {
  CallReport,
  CallReportRequest,
  CallReportRequestParams,
  PaginationResult,
  SelectItem,
} from "@/types/CallReports";
import BaseClient, { APIResponse } from "../baseClient";
import { ENDPOINTS } from "@/endpoints";
import { Courses } from "@/types/Courses";

class BDMClient extends BaseClient {
  async getCourses(): Promise<APIResponse<Courses[]>> {
    return await this.get<Courses[]>(ENDPOINTS.courses);
  }

//   async getCompanies(): Promise<APIResponse<SelectItem[]>> {
//     return await this.get<SelectItem[]>(ENDPOINTS.getCompanyList);
//   }

//   async getCallTypes(): Promise<APIResponse<SelectItem[]>> {
//     return await this.get<SelectItem[]>(ENDPOINTS.getCallTypeList);
//   }

//   async getConsultantsByCompany(
//     companyId: string,
//   ): Promise<APIResponse<SelectItem[]>> {
//     const endpoint = `${ENDPOINTS.getConsultantList}/${companyId}`;
//     return await this.get<SelectItem[]>(endpoint);
//   }

//   async getClientsByBostonId(
//     bostonId: string,
//   ): Promise<APIResponse<SelectItem[]>> {
//     const endpoint = `${ENDPOINTS.getClientList}/${bostonId}`;
//     return await this.get<SelectItem[]>(endpoint);
//   }

//   async createCallReport(formData: FormData) {
//     const response = await this.post(ENDPOINTS.createCallReport, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response;
//   }

//   async getCallReports({
//     ConsultantIds,
//     Status,
//     StartDate,
//     EndDate,
//     PageSize = 10,
//     PageNumber = 1,
//   }: CallReportRequest): Promise<APIResponse<PaginationResult<CallReport>>> {
//     const params: CallReportRequestParams = {
//       "Data.Status": Status,
//       "Data.StartDate": StartDate,
//       "Data.EndDate": EndDate,
//       PageSize,
//       PageNumber,
//     };

//     if (ConsultantIds && ConsultantIds.length) {
//       ConsultantIds.forEach((id, index) => {
//         params[`Data.ConsultantIds[${index}]`] = id;
//       });
//     }

//     return await this.get(ENDPOINTS.getCallReport, { params });
//   }

//   async getCallReportById(reportId: number): Promise<APIResponse<CallReport>> {
//     const endpoint = `${ENDPOINTS.getCallReport}/${reportId}`;
//     return await this.get<CallReport>(endpoint);
//   }

//   async updateCallReport(
//     reportId: number,
//     formData: FormData,
//   ): Promise<APIResponse<CallReport>> {
//     const endpoint = `${ENDPOINTS.getCallReport}/${reportId}`;
//     const options = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     return await this.put(endpoint, formData, options);
//   }

//   async updateCallReportStatus(
//     reportId: number,
//     jsonData: string,
//   ): Promise<APIResponse<unknown>> {
//     const endpoint = `${ENDPOINTS.getCallReport}/${reportId}/UpdateStatus`;
//     const options = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     return await this.put(endpoint, jsonData, options);
//   }

//   async deleteCallReport(reportId: number): Promise<APIResponse<unknown>> {
//     const endpoint = `${ENDPOINTS.getCallReport}/${reportId}`;
//     return await this.delete(endpoint);
//   }
}

export const bdmClient = new BDMClient();
