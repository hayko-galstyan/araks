/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { useGetTemplateById } from 'api/project-templates/use-get-template-by-id';
import { ITemplate } from 'api/project-templates/use-get-template-types';

export const useTemplateData = (
  activeKey: number,
  index: number,
  activeKeyTitle: number,
  rows: ITemplate[],
  setLeftBarLoading: (isLoading: boolean) => void
) => {
  const { data, isLoading } = useGetTemplateById(rows?.[activeKey]?.id ?? '', {
    enabled: !!rows?.[activeKey]?.id && index === activeKeyTitle,
  });

  const template = useMemo(
    () => (index === activeKeyTitle ? data?.data : undefined),
    [activeKeyTitle, data?.data, index]
  );

  useEffect(() => {
    setLeftBarLoading(isLoading);
  }, [isLoading]);

  return { template, isLoading };
};
