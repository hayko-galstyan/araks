import client from 'api/client';
import { TEMPLATE_TYPE_POSITION_UPDATE_URL, TYPE_POSITION_URL } from 'api/schema/type/use-update-types-position';
import {
  closePropertyEye,
  getEyeTypePerspective,
  PATH,
  SELECTORS,
} from './constants';
import {
  AddTypePerspective,
  AnimateGraphFit,
  ChangeTypePosition,
  GetTypeColors,
  ISelectedPerspective,
  SetPerspectiveData,
  SwitchTypePermission,
} from '../types';
import { URL_ADD_PERSPECTIVE_TYPE, URL_REMOVE_PERSPECTIVE_TYPE } from 'api/perspective/use-add-type-perspective';
import { setPropertyColor } from './format-type';
import { isPublicTemplate } from 'hooks/use-is-template-page';

export const animateGraphFit: AnimateGraphFit = (graph, sec) => {
  const stage = graph?.view?.stage?.parentElement as HTMLElement;
  if (stage) {
    stage.style.transitionDuration = sec;
    setTimeout(() => {
      stage.style.transitionDuration = '0s';
    }, 10);
  }
};

export const getTypeColors: GetTypeColors = (edge) => [
  edge.attr(PATH.EDGE_SOURCE_COLOR),
  edge.attr(PATH.EDGE_TARGET_COLOR),
];

export const isPerspective = () => location.pathname.includes('/perspectives/');

export const isTemplate = () => location.pathname.includes('/template/');

export const changeTypePosition: ChangeTypePosition = (id, { x, y }) => {
  const isTemplateEdit = location.pathname.includes('templates-edit');

  /** TemplateEdit page public template check */
  if (isTemplateEdit) {
    if (isPublicTemplate()) {
      return null;
    }
  }

  return client.put(
    `${isTemplateEdit ? TEMPLATE_TYPE_POSITION_UPDATE_URL.replace(':id', id) : TYPE_POSITION_URL.replace(':id', id)}`,
    {
      fx: x,
      fy: y,
    }
  );
};

export const switchTypePermission: SwitchTypePermission = (node, isAllow) => {
  const ports = node.getPorts();
  const isShowIcon = localStorage.getItem('eyeD') ?? 'false';

  const typeEye = getEyeTypePerspective(isShowIcon, isAllow)

  node.setAttrs(typeEye);

  if (isAllow) {
    for (const { id } of ports) node.setPortProp(id ?? '', 'attrs', closePropertyEye);
  } else {
    for (const { id, attrs } of ports) {
      node.setPortProp(id ?? '', 'attrs', {
        allow: true,
        [SELECTORS.PORT_BODY_RECT]:
          (attrs?.ref_property_type_id as unknown as string) === 'connection'
            ? setPropertyColor(
                attrs?.ref_property_type_id as unknown as string,
                node?.attrs?.body.stroke as unknown as string
              )
            : { fill: '#F2F2F2', stroke: '#F2F2F2' },
        [SELECTORS.PORT_NAME_TEXT]: { fill: '#414141' },
        [SELECTORS.PORT_TYPE_TEXT]: { fill: '#414141' },
      });
    }
  }
};

export const getPerspectiveData = (): ISelectedPerspective | null => {
  const data = localStorage.getItem('selected-perspective');
  return data ? JSON.parse(data) : null;
};

export const setPerspectiveData: SetPerspectiveData = (items) => {
  localStorage.setItem(
    'selected-perspective',
    JSON.stringify({
      ...items,
    })
  );
};

export const addTypePerspective: AddTypePerspective = (type_id) => {
  const { perspectiveId, project_id } = getPerspectiveData() ?? {};

  return perspectiveId ? client.post(`${URL_ADD_PERSPECTIVE_TYPE}/${perspectiveId}`, { project_id, type_id }) : null;
};

export const removeTypePerspective: AddTypePerspective = (type_id) => {
  const { perspectiveId, project_id } = getPerspectiveData() ?? {};

  return perspectiveId ? client.put(`${URL_REMOVE_PERSPECTIVE_TYPE}/${perspectiveId}`, { project_id, type_id }) : null;
};
