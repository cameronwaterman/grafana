import React, { FC, FormEvent, useState } from 'react';

import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';

import { LokiDatasource } from '../datasource';
import { LokiOptions, LokiQuery, LokiVariableQuery, LokiVariableQueryType as QueryType } from '../types';

const variableOptions = [
  { label: 'Label names', value: QueryType.labelNames },
  { label: 'Label values', value: QueryType.labelValues },
];

type Props = QueryEditorProps<LokiDatasource, LokiQuery, LokiOptions, LokiVariableQuery>;

export const LokiVariableQueryEditor: FC<Props> = ({ onChange }) => {
  const [type, setType] = useState<number | undefined>(undefined);
  const [label, setLabel] = useState('');
  const [stream, setStream] = useState('');

  const onQueryTypeChange = (newType: SelectableValue<QueryType>) => {
    setType(newType.value);
    if (newType.value !== undefined) {
      onChange({
        type: newType.value,
        label,
        stream,
        refId: 'LokiVariableQueryEditor-VariableQuery',
      });
    }
  };

  const onLabelChange = (e: FormEvent<HTMLInputElement>) => {
    setLabel(e.currentTarget.value);
  };

  const onStreamChange = (e: FormEvent<HTMLInputElement>) => {
    setStream(e.currentTarget.value);
  };

  const handleBlur = () => {
    if (type !== undefined) {
      onChange({ type, label, stream, refId: 'LokiVariableQueryEditor-VariableQuery' });
    }
  };

  return (
    <InlineFieldRow>
      <InlineField label="Query type" labelWidth={20}>
        <Select onChange={onQueryTypeChange} onBlur={handleBlur} value={type} options={variableOptions} width={16} />
      </InlineField>
      {type === QueryType.labelValues && (
        <>
          <InlineField label="Label" labelWidth={20}>
            <Input type="text" value={label} onChange={onLabelChange} onBlur={handleBlur} />
          </InlineField>
          <InlineField label="Stream selector" labelWidth={20}>
            <Input type="text" value={stream} onChange={onStreamChange} onBlur={handleBlur} />
          </InlineField>
        </>
      )}
    </InlineFieldRow>
  );
};
