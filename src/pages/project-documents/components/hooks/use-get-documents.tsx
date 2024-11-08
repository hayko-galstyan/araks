import { useEffect, useState } from 'react';
import { useDocument } from 'components/layouts/components/document/wrapper';
import { useGetDocumentsByType } from 'api/document-repositories/use-get-documents-by-type';
import { initialPageData } from '../constants';
import { IUseGetDocuments, IUseGetDocumentsParams } from 'types/document-repository';

export const useGetDocuments: ({ search, pageData }: IUseGetDocumentsParams) => IUseGetDocuments | undefined = ({
  search,
  pageData = initialPageData,
}) => {
  const [documents, setDocument] = useState<IUseGetDocuments>();
  const { selectedType, similarDocumentList } = useDocument() ?? {};
  const { mutate } = useGetDocumentsByType(search);

  useEffect(() => {
    if (!similarDocumentList) {
      const params = {
        project_type_id: selectedType,
        pageData,
        search,
      };

      mutate(params, {
        onSuccess: ({ data, count }) => {
          setDocument({
            documents: data,
            count,
          });
        },
      });
    } else {
      setDocument(similarDocumentList);
    }
  }, [mutate, selectedType, search, pageData, similarDocumentList]);

  return documents;
};
