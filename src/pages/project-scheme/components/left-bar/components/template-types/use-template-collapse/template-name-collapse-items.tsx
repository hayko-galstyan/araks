import { Dispatch, SetStateAction } from 'react';
import { useGetTemplateTypes } from 'api/project-templates/use-get-template-types';
import { TemplateTypeItem } from './template-type-collapse-item';
import { Space } from 'antd';

type UseTemplateTitles = (
  activeKeyTitle: number,
  search: string,
  setLeftBarLoading: Dispatch<SetStateAction<boolean>>
) => { label: JSX.Element; key: number; children: JSX.Element }[];

export const useTemplateTitles: UseTemplateTitles = (activeKeyTitle, search, setLeftBarLoading) => {
  const { data } = useGetTemplateTypes(search, {
    enabled: true,
    onSuccess: (data) => {
      if (!(data?.data.my_templates?.count && data?.data.public_templates?.count)) {
        setLeftBarLoading(false);
      }
    },
  });

  const myTemplates = {
    label: <Space>{`My Templates (${data?.my_templates?.count ?? 0})`}</Space>,
    key: 0,
    children: (
      <TemplateTypeItem
        index={0}
        rows={data?.my_templates?.rows}
        activeKeyTitle={activeKeyTitle}
        setLeftBarLoading={setLeftBarLoading}
      />
    ),
  };

  const publicTemplates = {
    label: <Space>{`Public Templates (${data?.public_templates?.count ?? 0})`}</Space>,
    key: 1,
    children: (
      <TemplateTypeItem
        index={1}
        rows={data?.public_templates?.rows}
        activeKeyTitle={activeKeyTitle}
        setLeftBarLoading={setLeftBarLoading}
      />
    ),
  };

  return [myTemplates, publicTemplates];
};
