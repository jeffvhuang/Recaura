import React from 'react';
import { List } from 'antd';
import { PatientCasefile } from 'src/models/patientModels';
import { Link } from 'react-router-dom';
import style from './casefiles.scss';
import Spinner from '../common/Spinner';

interface Props {
  files: PatientCasefile[];
  patientId: string;
  isFetching: boolean;
}

const Casefiles = ({ files, patientId, isFetching }: Props) => (
  <div className={style.list}>
    <div className={style.header}>
      <h3>Case Files</h3>
    </div>
    <List bordered>
      {isFetching ? (
        <List.Item>
          <div className={style.spinner}>
            <Spinner fontSize={26} />
          </div>
        </List.Item>
      ) : files.length > 0 ? (
        files.map((file) => (
          <Link to={`/patients/${patientId}/casefiles/${file.id}`} key={file.id}>
            <List.Item>{file.name}</List.Item>
          </Link>
        ))
      ) : (
        <List.Item>No case files exist for this patient</List.Item>
      )}
    </List>
  </div>
);

export default Casefiles;
