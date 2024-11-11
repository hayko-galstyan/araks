import { Badge } from 'antd';
import { TAnalyticsNodeTypeProperties } from 'api/types';
import { TreeSelectHeader } from 'components/analytics/styles';
import { TTreeSelectType } from 'components/analytics/types';

/* 
  generation columns table 
  @params [data] 
  @returns treeSelectType [data]
*/

export const transformDataToTreeSelect = (data: TAnalyticsNodeTypeProperties): TTreeSelectType => {
  if (!data) {
    return { id: '', name: '', title: null, value: '', key: '', children: [] };
  }

  return {
    title: (
      <TreeSelectHeader gap={16} color={data.color}>
        <Badge color={data.color} />
        {data.name}
      </TreeSelectHeader>
    ),
    value: data.id,
    key: data.id,
    disabled: true,
    children: [
      ...(data.properties || []).map((prop) => ({
        title: (
          <TreeSelectHeader gap={16} color={data.color}>
            <Badge color={data.color} />
            {prop.name}
          </TreeSelectHeader>
        ),
        disabled: false,
        name: prop.name,
        project_type_name: data.name,
        project_type_id: data.id,
        type: prop.ref_property_type_id,
        value: prop.id,
        key: `property-${data.id}-${prop.id}`,
      })),
      ...(data.edges || []).map((edge) => ({
        title: (
          <TreeSelectHeader gap={16} color={data.color}>
            <Badge color={data.color} />
            {edge.name}
          </TreeSelectHeader>
        ),
        disabled: true,
        value: edge.id,
        name: edge.name,
        key: `edge-${data.id}-${edge.id}`,
        children: [
          ...(edge.properties || []).map((prop) => ({
            title: (
              <TreeSelectHeader gap={16} color={data.color}>
                <Badge color={data.color} />
                {prop.name}
              </TreeSelectHeader>
            ),
            disabled: false,
            project_type_name: edge.name,
            project_type_id: edge.id,
            target_edge_type_id: edge.id,
            type: prop.ref_property_type_id,
            value: prop.id,
            key: `edge-property-${edge.id}-${prop.id}`,
          })),
          edge.target && {
            title: (
              <TreeSelectHeader gap={16} color={data.color}>
                <Badge color={data.color} />
                {edge.target.name}
              </TreeSelectHeader>
            ),
            disabled: true,
            name: edge.target.name,
            value: edge.target.id,
            key: `edge-target-${edge.id}-${edge.target.id}`,
            children: (edge.target.properties || []).map((targetProp) => ({
              title: (
                <TreeSelectHeader gap={16} color={data.color}>
                  <Badge color={data.color} />
                  {targetProp.name}
                </TreeSelectHeader>
              ),
              disabled: false,
              name: targetProp.name,
              target_edge_type_id: edge.id,
              project_type_id: edge.target.id,
              project_type_name: edge.target.name,
              value: targetProp.id,
              type: targetProp.ref_property_type_id,
              key: `edge-target-property-${edge.target.id}-${targetProp.id}`,
            })),
          },
        ].filter(Boolean),
      })),
    ],
  };
};
