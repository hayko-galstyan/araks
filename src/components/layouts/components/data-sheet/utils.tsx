import { FC } from 'react';
import { Badge, Space, Tooltip } from 'antd';
import { NodeEdgeTypesReturnData, ProjectTreeReturnData } from 'api/types';
import { Text } from 'components/typography';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { COLORS } from 'helpers/constants';
import { EdgeDirection } from 'pages/data-sheet/components/connection-table/components/direction';
import { QueryFilterTypes } from 'components/select/queries-select';

const StyledBadge = styled(({ defaultProprtyId, ...props }) => <Badge {...props} />)`
  && {
    .ant-badge-status-dot {
      height: 16px;
      width: 16px;
    }
  }
`;

interface DynamicTextProps {
  text: string;
  width: number;
}
interface ConnectionProps {
  fill: string;
}
const DynamicTextContainer = styled(Text)`
  width: 13rem;
  white-space: nowrap;
  overflow: hidden;
`;

const DynamicEllipsis: FC<DynamicTextProps> = ({ text, width }) => {
  let displayText = text;

  if (text.length > width) {
    const truncatedText = text.substring(0, width - 1);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    const lastUnderscoreIndex = truncatedText.lastIndexOf('_');
    const lastSeparatorIndex = Math.max(lastSpaceIndex, lastUnderscoreIndex);

    if (lastSeparatorIndex !== -1) {
      displayText = truncatedText.substring(0, lastSeparatorIndex) + '...';
    } else {
      displayText = truncatedText + '...';
    }
  }

  return <DynamicTextContainer title={text}>{displayText}</DynamicTextContainer>;
};

export const ConnectionInverse = ({ fill }: ConnectionProps) => (
  <svg width="19" height="20" viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5715 6.36591C8.66297 6.36554 4.80196 6.36659 0.940946 6.36344C0.245289 6.36287 -0.0335476 6.06538 0.00318751 5.39674C0.0278186 4.94842 0.256306 4.70441 0.648986 4.64051C0.804023 4.61529 0.964854 4.63061 1.12305 4.6306C5.85437 4.63051 10.5857 4.63081 15.317 4.63105C15.4889 4.63106 15.6609 4.63105 15.8655 4.63105C15.8431 4.37639 15.6811 4.27513 15.5686 4.14989C14.9485 3.45928 14.3111 2.78676 13.6997 2.08712C13.2151 1.53251 13.3339 0.819803 13.9244 0.564664C14.265 0.41751 14.5559 0.533669 14.7928 0.79018C16.152 2.26191 17.501 3.74478 18.8588 5.21806C19.045 5.42014 19.0487 5.57333 18.8598 5.77815C17.5124 7.23835 16.1765 8.71119 14.8261 10.168C14.4291 10.5962 13.9913 10.6012 13.6463 10.2349C13.3018 9.86928 13.3074 9.34446 13.6968 8.90182C14.2666 8.25422 14.8574 7.62869 15.4374 6.99177C15.5682 6.84814 15.6914 6.69632 15.8181 6.54826C15.8089 6.48748 15.7997 6.42669 15.7905 6.3659C14.7333 6.3659 13.6761 6.3659 12.5715 6.36591Z"
      fill={fill}
    />
    <path
      d="M9.17544 14.2198C12.1051 14.2198 14.9871 14.2196 17.8692 14.2202C18.0275 14.2202 18.188 14.2113 18.3434 14.2337C18.7504 14.2924 19.0066 14.6056 18.9999 15.0167C18.993 15.4381 18.7545 15.6777 18.3545 15.7616C18.1872 15.7967 18.0076 15.779 17.8336 15.7791C13.2096 15.78 8.58558 15.7802 3.96158 15.7805C3.68047 15.7805 3.39936 15.7805 2.96385 15.7805C3.73284 16.5233 4.39642 17.1615 5.05621 17.8035C5.22401 17.9667 5.41114 18.1173 5.50915 18.3374C5.67403 18.7078 5.6164 19.0462 5.30201 19.3068C5.0016 19.5558 4.66589 19.5625 4.34008 19.3363C4.23732 19.2649 4.14251 19.1804 4.0532 19.0929C2.76442 17.8306 1.48104 16.5629 0.185978 15.3069C-0.0388433 15.0888 -0.0783251 14.9439 0.170323 14.7036C1.49038 13.4282 2.79334 12.1357 4.10359 10.8505C4.34763 10.6111 4.62055 10.4295 4.99072 10.5267C5.61413 10.6904 5.80786 11.405 5.33815 11.9027C4.8221 12.4496 4.27581 12.9696 3.73109 13.4895C3.51693 13.694 3.27133 13.8667 3.04005 14.0539C3.06981 14.1092 3.09957 14.1645 3.12934 14.2198C5.12886 14.2198 7.12838 14.2198 9.17544 14.2198Z"
      fill={fill}
    />
  </svg>
);

export const ConnectionOneDirection = ({ fill }: ConnectionProps) => (
  <svg width="19" height="10" viewBox="0 0 19 10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5715 5.86591C8.66297 5.86554 4.80196 5.86659 0.940946 5.86344C0.245289 5.86287 -0.0335476 5.56538 0.00318751 4.89674C0.0278186 4.44842 0.256306 4.20441 0.648986 4.14051C0.804023 4.11529 0.964854 4.13061 1.12305 4.1306C5.85437 4.13051 10.5857 4.13081 15.317 4.13105C15.4889 4.13106 15.6609 4.13105 15.8655 4.13105C15.8431 3.87639 15.6811 3.77513 15.5686 3.64989C14.9485 2.95928 14.3111 2.28676 13.6997 1.58712C13.2151 1.03251 13.3339 0.319803 13.9244 0.0646639C14.265 -0.0824896 14.5559 0.0336694 14.7928 0.29018C16.152 1.76191 17.501 3.24478 18.8588 4.71806C19.045 4.92014 19.0487 5.07333 18.8598 5.27815C17.5124 6.73835 16.1765 8.21119 14.8261 9.66798C14.4291 10.0962 13.9913 10.1012 13.6463 9.73491C13.3018 9.36928 13.3074 8.84446 13.6968 8.40182C14.2666 7.75422 14.8574 7.12869 15.4374 6.49177C15.5682 6.34814 15.6914 6.19632 15.8181 6.04826C15.8089 5.98748 15.7997 5.92669 15.7905 5.8659C14.7333 5.8659 13.6761 5.8659 12.5715 5.86591Z"
      fill={fill}
    />
  </svg>
);

export const createNodesTree = (
  nodesList: ProjectTreeReturnData[],
  noColors = false,
  parentId?: string,
  widthTextWrap?: number
): TreeNodeType[] => {
  const filteredNodes = nodesList?.filter(
    (node) =>
      (!parentId && !node.parent_id) ||
      (parentId && node.parent_id === parentId) ||
      (!noColors && !parentId && !node.parent_id)
  );

  return filteredNodes?.map((node) => {
    const defaultPropertyId = node.properties?.find((item) => item.default_property === true)?.id || '';

    const treeNode: TreeNodeType = {
      title: (
        <Tooltip overlayClassName="action-tooltip" title={node.name} placement="top">
          {noColors ? (
            widthTextWrap ? (
              <DynamicEllipsis text={node.name} width={widthTextWrap} />
            ) : (
              <Text>{node.name}</Text>
            )
          ) : (
            <StyledBadge
              color={node.color}
              text={
                widthTextWrap ? <DynamicEllipsis text={node.name} width={widthTextWrap} /> : <Text>{node.name}</Text>
              }
              defaultProprtyId={defaultPropertyId}
            />
          )}
        </Tooltip>
      ),
      label: node.id,
      value: node.name,
      key: node.id,
      ...node,
    };

    treeNode.children = createNodesTree(nodesList, noColors, node.id, widthTextWrap);

    return treeNode;
  });
};

export function findConnectionChildrenProperties(arr: TreeConnectionType[], selectedValue: string) {
  for (const element of arr) {
    if (element.name === selectedValue) {
      return {
        ...element,
        depth: 1,
        isConnectionType: true,
        labelName: element.label,
        labelValue: element.name,
        type: QueryFilterTypes.IS_NOT_NULL,
      };
    }
    if (element.children) {
      for (const child of element.children) {
        if (child.value === selectedValue) {
          return {
            ...child,
            depth: 2,
            isConnectionType: true,
            labelName: `${element.name}.${child.label}`,
            labelValue: element.name,
            name: child.label,
            labelHead: (
              <Space>
                <StyledBadge color={child.source.color} text={<Text>{child.source.name}</Text>} />
                <EdgeDirection data={child} />
                <StyledBadge color={child.target.color} text={<Text>{child.target.name}</Text>} />
              </Space>
            ),
          };
        }
        if (child.children) {
          for (const subChild of child.children) {
            if (subChild.value === selectedValue) {
              return {
                ...subChild,
                id: element.id,
                isConnectionType: true,
                depth: 3,
                labelName: `${element.name}.${child.label}.${subChild.name}`,
                labelHead: (
                  <Space>
                    <StyledBadge color={element.source.color} text={<Text>{element.source.name}</Text>} />
                    <EdgeDirection data={element} />
                    <StyledBadge color={element.target.color} text={<Text>{element.target.name}</Text>} />
                  </Space>
                ),
                labelValue: element.name,
              };
            }
          }
        }
      }
    }
  }
  return null;
}

export const createQueriesNodesTree = (nodesList: ProjectTreeReturnData[], noColors = false, parentId?: string) => {
  const list = [];
  for (let i = 0; i < nodesList.length; i += 1) {
    const defaultProprtyId = nodesList[i].properties?.find((item) => item.default_property === true)?.id || '';
    const key = nodesList[i].id;
    const treeNode: TreeNodeType = {
      title: noColors ? (
        <Text>{nodesList[i].name}</Text>
      ) : (
        <StyledBadge
          color={nodesList[i].color}
          text={<Text>{nodesList[i].name}</Text>}
          defaultProprtyId={defaultProprtyId}
        />
      ),
      label: nodesList[i].name,
      value: key,
      key,
      children: nodesList[i].properties?.map((item) => ({
        label: item.name,
        color: nodesList[i].color,
        title: (
          <>
            <Text color={COLORS.PRIMARY.GRAY}>{nodesList[i].name}</Text>
            <Text color={COLORS.PRIMARY.BLUE}>.{item.name}</Text>
          </>
        ),
        ...item,
        value: item.id,
        key: item.id,
      })),
      ...nodesList[i],
    };

    list.push(treeNode);
  }
  return list;
};

export const createQueriesConnectionTree = (dataList: NodeEdgeTypesReturnData[]) =>
  dataList.reduce((result: TreeConnectionType[], item: NodeEdgeTypesReturnData) => {
    const nameExists = result.findIndex((r) => r.label === item.name);

    if (nameExists !== -1) {
      const updatedNode = {
        ...result[nameExists],
        title: (
          <Space>
            <Connection />
            <Text>{`${item.name} (${result[nameExists].count + 1})`}</Text>
          </Space>
        ),
        count: result[nameExists].count + 1,
        children: [
          ...(result[nameExists].children || []),
          {
            label: `${item.source.name}-${item.target.name}`,
            value: item.id,
            key: item.id,
            id: item.id,
            parentName: item.name,
            inverse: item.inverse,
            source: { name: item.source.name, color: item.source.color },
            target: { name: item.target.name, color: item.target.color },
            children: item.properties?.map((itemChild) => ({
              label: <Text>{`${item.name}.${itemChild.name}`}</Text>,
              title: (
                <>
                  <Text color={COLORS.PRIMARY.GRAY}>{item.name}</Text>
                  <Text color={COLORS.PRIMARY.BLUE}>.{itemChild.name}</Text>
                </>
              ),
              ...itemChild,
              value: itemChild.id,
              key: itemChild.id,
            })),
            title: (
              <Space>
                <Text>{item.source.name}</Text>
                {item.inverse === true ? (
                  <ConnectionInverse fill={item.source.color || ''} />
                ) : (
                  <ConnectionOneDirection fill={item.source.color || ''} />
                )}
                <Text>{item.target.name}</Text>
              </Space>
            ),
          },
        ],
      };
      result.splice(nameExists, 1, updatedNode);
      return result;
    }

    result.push({
      label: item.name,
      count: 1,
      title: (
        <Space>
          <Connection />
          <Text>{`${item.name} (${1})`}</Text>
        </Space>
      ),
      value: item.name,
      key: item.name,
      children: [
        {
          label: `${item.source.name}-${item.target.name}`,
          title: (
            <Space>
              <Text>{item.source.name}</Text>
              {item.inverse === true ? (
                <ConnectionInverse fill={item.source.color || ''} />
              ) : (
                <ConnectionOneDirection fill={item.source.color || ''} />
              )}
              <Text>{item.target.name}</Text>
            </Space>
          ),
          value: item.id,
          key: item.id,
          id: item.id,
          inverse: item.inverse,
          source: { name: item.source.name, color: item.source.color },
          target: { name: item.target.name, color: item.target.color },
          parentName: item.name,
        },
      ],
      ...item,
    });

    return result;
  }, [] as TreeConnectionType[]);

export const createConnectionTree = (dataList: NodeEdgeTypesReturnData[]) =>
  dataList.reduce((result: TreeConnectionType[], item: NodeEdgeTypesReturnData) => {
    const nameExists = result.findIndex((r) => r.label === item.name);
    if (nameExists !== -1) {
      const updatedNode = {
        ...result[nameExists],
        title: (
          <Space>
            <Connection />
            <Text>{`${item.name} (${result[nameExists].count + 1})`}</Text>
          </Space>
        ),
        count: result[nameExists].count + 1,
        children: [
          ...(result[nameExists].children || []),
          {
            label: `${item.source.name}-${item.target.name}`,
            value: item.id,
            key: item.id,
            id: item.id,
            source: { name: item.source.name, color: item.source.color },
            target: { name: item.target.name, color: item.target.color },
            parentName: item.name,
            title: (
              <Space>
                <DynamicEllipsis text={item.source.name} width={12} />
                {item.inverse === true ? (
                  <ConnectionInverse fill={item.source.color || ''} />
                ) : (
                  <ConnectionOneDirection fill={item.source.color || ''} />
                )}
                <DynamicEllipsis text={item.target.name} width={20} />
              </Space>
            ),
          },
        ],
      };
      result.splice(nameExists, 1, updatedNode);
      return result;
    }

    result.push({
      label: item.name,
      count: 1,
      title: (
        <Space>
          <Connection />
          <Text>{`${item.name} (${1})`}</Text>
        </Space> 
      ),
      disabled: true,
      value: item.id,
      key: item.name,
      selectable: false,
      children: [
        {
          label: `${item.source.name}-${item.target.name}`,
          title: (
            <Space>
              <DynamicEllipsis text={item.source.name} width={12} />
              {item.inverse === true ? <ConnectionInverse fill={item.source.color || ''} /> : <ConnectionOneDirection fill={item.source.color || ''} />}
              <DynamicEllipsis text={item.target.name} width={20} />
            </Space>
          ),
          value: item.id,
          key: item.id,
          id: item.id,
          source: { name: item.source.name, color: item.source.color },
          target: { name: item.target.name, color: item.target.color },
          parentName: item.name,
        },
      ],
      ...item,
    });

    return result;
  }, [] as TreeConnectionType[]);
