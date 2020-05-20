import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ApplicationState } from '../../stores';
import { ConsultationBase } from 'src/models/consultationModels';
import PatientInfo from '../common/PatientInfo';
import style from './consultation.scss';
import { ConsultPart } from '../../helpers/utils';
import Subjective from './Subjective';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string; consultId: string }>;

type State = {
  display: ConsultPart;
};

class NewConsultationPage extends React.Component<Props, State> {
  state = {
    display: ConsultPart.Subjective
  };

  componentDidMount() {
    this.props.clearConsult();
  }

  onSubmit = (values: ConsultationBase) => {
    values.patientId = this.props.match.params.patientId;
    this.props.createConsult(values);
  };

  selectSection = (display: ConsultPart) => this.setState({ display });

  renderConsultSection = (consultPart: ConsultPart) => {
    switch (consultPart) {
      case ConsultPart.Subjective:
        return <Subjective display={consultPart} changeSection={this.selectSection} />;
      // case ConsultPart.Objective:
      //   return <Objective consultId={consultId} />;
      // case ConsultPart.Treatments:
      // case ConsultPart.Plan:
      //   return <TreatmentsAndPlan consultId={consultId} />;
      default:
        return null;
    }
  };

  render() {
    const { display } = this.state;

    return (
      <>
        <PatientInfo />
        <div className={style.container}>{this.renderConsultSection(display)}</div>
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(NewConsultationPage);