import { ApiService } from './apiService';
import { AxiosResponse } from 'axios';
import { Casefile, CasefileBase } from 'src/models/casefileModels';
import { keys } from '../helpers/keys';
import { message } from 'antd';

const { apiUrl } = keys;

class CasefileService extends ApiService {
  createCasefile = async (casefile: CasefileBase, token: string): Promise<Casefile> => {
    try {
      const url = `${apiUrl}/casefiles`;
      const resp = (await this.post(url, casefile, token)) as AxiosResponse<Casefile>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getCasefiles = async (patientId: string, token: string): Promise<Casefile[]> => {
    try {
      const url = `${apiUrl}/casefiles?patientId=${patientId}&sortBy=updatedAt:desc`;
      const resp = (await this.get(url, token)) as AxiosResponse<Casefile[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getCasefile = async (id: string, token: string): Promise<Casefile> => {
    try {
      const url = `${apiUrl}/casefiles/${id}`;
      const resp = (await this.get(url, token)) as AxiosResponse<Casefile>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  updateCasefile = async (id: string, casefile: CasefileBase, token: string): Promise<Casefile> => {
    try {
      const url = `${apiUrl}/casefiles/${id}`;
      const resp = (await this.patch(url, casefile, token)) as AxiosResponse<Casefile>;
      message.success('Casefile updated');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  deleteCasefile = async (id: string, token: string): Promise<Casefile> => {
    try {
      const url = `${apiUrl}/casefiles/${id}`;
      const resp = (await this.delete(url, token)) as AxiosResponse<Casefile>;
      message.success('Casefile deleted');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };
}

const casefileService = new CasefileService();
export default casefileService;
