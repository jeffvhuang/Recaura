import { AccessLevel } from './../../models/enums';
import { AppThunkAction } from '../index';
import * as T from './practitionerTypes';
import practitionerService from '../../services/practitionerService';
import { PractitionerBase } from '../../models/practitionerModels';
import history from '../../helpers/history';
import cookieService from '../../services/cookieService';
import clinicService from '../../services/clinicService';
import { NOT_LOGGED_IN } from '../../helpers/constants';
import { SignUpValues } from '../../helpers/formHelper';
import { handleNotLoggedInError } from '../../helpers/utils';
import { CLEAR_DATA } from '../common/types';
import { C as CT, CreateClinicKnownAction } from '../clinics/clinicTypes';
import { emptyPractitioner } from '../common/objects';

const { C } = T;

export const loginPractitioner = (
  email: string,
  password: string
): AppThunkAction<T.LoginPractitionerKnownAction> => async (dispatch) => {
  dispatch({ type: C.LOGIN_PRACTITIONER_REQUEST });

  try {
    const response = await practitionerService.login(email, password);

    cookieService.setUserToken(response.token);
    delete response.token;

    dispatch({ type: C.LOGIN_PRACTITIONER_SUCCESS, payload: response.practitioner });
  } catch (e) {
    dispatch({ type: C.LOGIN_PRACTITIONER_FAILURE });
  }
};

export const logoutPractitioner = (): AppThunkAction<T.KnownAction> => async (dispatch) => {
  dispatch({ type: C.LOGOUT_PRACTITIONER_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (token) await practitionerService.logout(token);
    cookieService.removeUserToken();

    // dispatch({ type: C.LOGOUT_PRACTITIONER_SUCCESS });
    dispatch({ type: CLEAR_DATA });
    history.push('/login');
  } catch (e) {
    dispatch({ type: C.LOGOUT_PRACTITIONER_FAILURE });
  }
};

type SignUpKnownAction = CreateClinicKnownAction & T.CreatePractitionerKnownAction;

export const signUpPractitioner = (
  values: SignUpValues
): AppThunkAction<SignUpKnownAction> => async (dispatch, getState) => {
  dispatch({ type: CT.CREATE_CLINIC_REQUEST });

  try {
    const clinicData = { name: values.clinicName, isActive: true, locations: [] };
    const clinic = await clinicService.createClinic(clinicData);

    dispatch({ type: CT.CREATE_CLINIC_SUCCESS, payload: clinic });

    const practitioner = {
      ...emptyPractitioner,
      clinicId: clinic.id,
      email: values.email,
      password: values.password,
      accessLevel: AccessLevel.master
    };
    delete practitioner.id;
    createPractitioner(practitioner)(dispatch, getState);
  } catch (e) {
    dispatch({ type: CT.CREATE_CLINIC_FAILURE });
  }
};

export const createPractitioner = (
  practitioner: PractitionerBase
): AppThunkAction<T.CreatePractitionerKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_PRACTITIONER_REQUEST });

  try {
    const resp = await practitionerService.createPractitioner(practitioner);
    cookieService.setUserToken(resp.token);
    delete resp.token;

    dispatch({ type: C.CREATE_PRACTITIONER_SUCCESS, payload: resp.practitioner });
    history.push(`/`);
  } catch (error) {
    dispatch({ type: C.CREATE_PRACTITIONER_FAILURE, payload: error });
  }
};

export const getPractitioners = (): AppThunkAction<T.GetPractitionersKnownAction> => async (
  dispatch
) => {
  dispatch({ type: C.GET_PRACTITIONERS_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    dispatch({
      type: C.GET_PRACTITIONERS_SUCCESS,
      payload: await practitionerService.getPractitioners(token)
    });
  } catch (error) {
    dispatch({ type: C.GET_PRACTITIONERS_FAILURE, payload: error });
    if (error === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};

export const getPractitioner = (id: string): AppThunkAction<T.GetPractitionerKnownAction> => async (
  dispatch,
  getState
) => {
  // Only load data if it's something we don't already have (and are not already loading)
  const appState = getState();
  if (id !== appState?.practitioner?.id) {
    dispatch({ type: C.GET_PRACTITIONER_REQUEST });

    try {
      const token = cookieService.getUserToken();
      if (!token) throw NOT_LOGGED_IN;

      dispatch({
        type: C.GET_PRACTITIONER_SUCCESS,
        payload: await practitionerService.getPractitioner(id, token)
      });
    } catch (error) {
      dispatch({ type: C.GET_PRACTITIONER_FAILURE, payload: error });
      if (error === NOT_LOGGED_IN) handleNotLoggedInError();
    }
  }
};

export const updatePractitioner = (
  id: string,
  practitioner: PractitionerBase
): AppThunkAction<T.UpdatePractitionerKnownAction> => async (dispatch) => {
  dispatch({ type: C.UPDATE_PRACTITIONER_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    const updatedPractitioner = await practitionerService.updatePractitioner(
      id,
      practitioner,
      token
    );
    dispatch({ type: C.UPDATE_PRACTITIONER_SUCCESS, payload: updatedPractitioner });
  } catch (e) {
    dispatch({ type: C.UPDATE_PRACTITIONER_FAILURE, payload: e });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};

export const deletePractitioner = (
  id: string
): AppThunkAction<T.DeletePractitionerKnownAction> => async (dispatch) => {
  dispatch({ type: C.DELETE_PRACTITIONER_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    await practitionerService.deletePractitioner(id, token);
    dispatch({ type: C.DELETE_PRACTITIONER_SUCCESS, payload: id });
    history.push(`/practitioners`);
  } catch (e) {
    dispatch({ type: C.DELETE_PRACTITIONER_FAILURE, payload: e });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};
