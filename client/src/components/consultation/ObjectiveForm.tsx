import React from 'react';
import { useForm } from 'react-hook-form';
import { ObjectiveAssessment } from '../../models/consultationModels';
import { Button } from 'antd';
import HookTextArea from '../common/forms/HookTextArea';
import style from '../common/forms/hookForm.scss';
import NavPills from './NavPills';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';
import { emptyObjective } from '../../stores/common/objects';

interface Props {
  data?: ObjectiveAssessment;
  display: ConsultPart;
  changeSection: (display: ConsultPart) => void;
  saveValues: (values: ObjectiveAssessment) => void;
}

function ObjectiveForm({ data, display, changeSection, saveValues }: Props) {
  const defaultValues = data ?? emptyObjective;
  const { register, handleSubmit } = useForm<ObjectiveAssessment>({ defaultValues });

  const onChangeSection = (e: RadioChangeEvent) => {
    handleSubmit(saveValues)();
    changeSection(e.target.value);
  };

  const saveAndNext = (values: ObjectiveAssessment) => {
    saveValues(values);
    changeSection(ConsultPart.Treatments);
  };

  return (
    <>
      <NavPills value={display} onChange={onChangeSection} />
      <form onSubmit={handleSubmit(saveAndNext)} className={style.hookConsultForm}>
        <div>
          <div className={style.hookRow}>
            <HookTextArea label="Observation" name="observation" register={register} />
            <HookTextArea label="Palpation" name="palpation" register={register} />
          </div>
          <div className={style.hookRow}>
            <HookTextArea label="Active" name="active" register={register} />
            <HookTextArea label="Passive" name="passive" register={register} />
          </div>
          <div className={style.hookRow}>
            <HookTextArea label="Isometric" name="resistedIsometric" register={register} />
            <HookTextArea label="Functional" name="functionalTests" register={register} />
          </div>
          <div className={style.hookRow}>
            <HookTextArea label="Neurological" name="neurologicalTests" register={register} />
            <HookTextArea label="Special" name="specialTests" register={register} />
          </div>
          <HookTextArea label="Additional" name="additional" register={register} />
        </div>
        <div className={style.submitRow}>
          <Button type="primary" htmlType="submit">
            Treatments/Plan >
          </Button>
        </div>
      </form>
    </>
  );
}

export default ObjectiveForm;
