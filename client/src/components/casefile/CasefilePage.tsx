import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
import CasefileForm from './CasefileForm';
import { CasefileBase } from 'src/models/casefileModels';
import PatientInfo from '../common/PatientInfo';

const mapStateToProps = (state: ApplicationState) => state.casefile;
const connector = connect(mapStateToProps, casefileActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ patientId: string }>;

class CasefilePage extends React.Component<Props> {
  onSubmit = async (values: CasefileBase) => {
    values.patientId = this.props.match.params.patientId;
    this.props.createCasefile(values);
  };

  render() {
    return (
      <>
        <PatientInfo />
        <CasefileForm onSubmit={this.onSubmit} isSaving={this.props.isFetching} />
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefilePage);
