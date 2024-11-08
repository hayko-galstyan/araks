import { PATHS } from 'helpers/constants';
import { useLocation } from 'react-router-dom';

export const useIsTemplatePage = () => {
  const { pathname } = useLocation();

  return pathname.replace(':id', '').includes(PATHS.PROJECT_TEMPLATE.replace(':id', ''));
};

export const useIsTemplateEditPage = () => {
  const { pathname } = useLocation();

  return pathname.replace(':id', '').includes(PATHS.PROJECT_TEMPLATE_EDIT.replace(':id', ''));
};

export const isPublicTemplate = () =>
  document.location.pathname.replace(':id', '').includes(PATHS.PROJECT_TEMPLATE_EDIT.replace(':id', '')) &&
  !document?.querySelector('#private');
