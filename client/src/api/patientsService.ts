import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import { IGetPatientsVm, IGetPatientVm, IGetCaseFileVm } from "./generated";
import { message } from "antd";
import { keys } from "../helpers/keys";

const { apiUrl } = keys;

class PatientsService {
  getPatients = async (): Promise<IGetPatientsVm> => {
    try {
      console.log('apiUrl', apiUrl);
      const url = `${apiUrl}/api/patients`;
      console.log('request url:', url)
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetPatientsVm>;
      console.log('data', resp.data)
      return resp.data;
    } catch (e) {
      message.error(e);
      console.log(e);
      return Promise.reject(e);
    }
  };

  getPatient = async (id: number): Promise<IGetPatientVm> => {
    try {
      const url = `${apiUrl}/api/patients/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetPatientVm>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getCaseFile = async (id: number): Promise<IGetCaseFileVm> => {
    try {
      const url = `${apiUrl}/api/casefiles/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetCaseFileVm>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

export const patientsService = new PatientsService();
