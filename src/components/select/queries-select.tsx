import { Select } from '.';
import { RefSelectProps } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { ReturQuerynData } from 'api/query-history/use-get-histories-by-id';
import dayjs from 'dayjs';

export enum QueryFilterTypes {
  GREATHER_THAN = 'Greather than',
  LESS_THAN = 'Less Than',
  CONTAINS = 'Contains',
  IS_NOT_NULL = 'Is not Null',
  IS_NULL = 'Is Null',
  BETWEEN = 'Between',
  BEFORE = 'Before',
  AFTER = 'After',
  IS = 'Is',
  IS_NOT = 'Is not',
  EQUAL_TO = 'Equal to',
  RANGE = 'Range',
}
export const setQueryFilterType = (value: string, type: string): string | null => {
  switch (value) {
    case '>':
      switch (type) {
        case 'datetime':
          return QueryFilterTypes.AFTER;
        default:
          return QueryFilterTypes.GREATHER_THAN;
      }
    case '<':
      switch (type) {
        case 'datetime':
          return QueryFilterTypes.BEFORE;
        default:
          return QueryFilterTypes.LESS_THAN;
      }
    case '=':
      return QueryFilterTypes.EQUAL_TO;
    case 'IS_NOT_VALUE':
      return QueryFilterTypes.IS_NOT;
    case 'IS_VALUE':
      return QueryFilterTypes.IS;
    case 'BETWEEN':
      switch (type) {
        case 'datetime':
          return QueryFilterTypes.RANGE;
        default:
          return QueryFilterTypes.BETWEEN;
      }
    case 'IS_NULL':
      return QueryFilterTypes.IS_NULL;
    case 'IS_NOT_NULL':
      return QueryFilterTypes.IS_NOT_NULL;
    case 'CONTAINS':
      return QueryFilterTypes.CONTAINS;
    default:
      return null;
  }
};
export const setQueryFormValue = ({ data }: ReturQuerynData) => {
  const FormData = data.queryArr.map((query) => {
    const dataDepth = query.type === 'node' ? query?.query && Object.keys(query?.query)?.length ? 2 : 1:query?.query && Object.keys(query?.query)?.length ? 4 : 3
    const queryTupe =
      query?.query && Object.keys(query?.query)?.length
        ? setQueryFilterType(
            query?.query[Object.keys(query?.query)[0]].action,
            query?.query[Object.keys(query?.query)[0]].type
          )
        : setQueryFilterType(query.action, query.type);
      const dataID = dataDepth === 1 ? query.query_history_node_type_id : dataDepth === 2 ? query?.query[Object.keys(query?.query)[0]].query_history_node_property_id :dataDepth === 3 ? query.query_history_edge_type_id :query?.query[Object.keys(query?.query)[0]].query_history_edge_property_id;
      const dataParent_ID = dataDepth === 2 ? query.query_history_node_type_id: dataDepth === 4 ? query.query_history_edge_type_id : undefined;
    if (queryTupe === 'Between') {
      if (query?.query[Object.keys(query?.query)[0]].type === 'integer') {
        const value = query?.query[Object.keys(query?.query)[0]].value.split(',');
        return {
          ...query,
          id:dataID,
          name: dataDepth === 2 || dataDepth === 4 ? query?.query[Object.keys(query?.query)[0]].name : query.label,
          parent_id:dataParent_ID,
          labelName: `${query.label}.${query?.query[Object.keys(query?.query)[0]].name}`,
          labelValue: query.label,
          betweenStart: value[0],
          betweenEnd: value[1],
          type: queryTupe,
          depth: dataDepth,
          isConnectionType: query.type === 'node' ? false : true,
          ref_property_type_id: query?.query[Object.keys(query?.query)[0]].type,
        };
      } else {
        return {
          ...query,
          id:dataID,
          name: dataDepth === 2 || dataDepth === 4 ? query?.query[Object.keys(query?.query)[0]].name : query.label,
          parent_id:dataParent_ID,
          labelName:
            dataDepth === 2|| dataDepth === 4 ? `${query.label}.${query?.query[Object.keys(query?.query)[0]].name}` : query.label,
          labelValue: query.label,
          type: queryTupe,
          depth: dataDepth,
          isConnectionType: query.type === 'node' ? false : true,
          ref_property_type_id: query?.query[Object.keys(query?.query)[0]].type,
        };
      }
    } else if (queryTupe === 'Contains' || queryTupe === 'Is' || queryTupe === 'Is not') {
      return {
        ...query,
        id:dataID,
        name: dataDepth === 2 || dataDepth === 4 ? query?.query[Object.keys(query?.query)[0]].name : query.label,
        parent_id:dataParent_ID,
        labelName: dataDepth === 2|| dataDepth === 4 ? `${query.label}.${query?.query[Object.keys(query?.query)[0]].name}` : query.label,
        labelValue: query.label,
        typeText: query?.query[Object.keys(query?.query)[0]].value,
        type: queryTupe,
        depth: dataDepth=== 1 || dataDepth=== 3 ? 1:2,
        isConnectionType: query.type === 'node' ? false : true,
        ref_property_type_id: query?.query[Object.keys(query?.query)[0]].type,
      };
    } else if (queryTupe === 'Before' || queryTupe === 'After') {
      return {
        ...query,
        id:dataID,
        name: dataDepth === 2 || dataDepth === 4 ? query?.query[Object.keys(query?.query)[0]].name : query.label,
        parent_id:dataParent_ID,
        labelName: dataDepth === 2|| dataDepth === 4 ? `${query.label}.${query?.query[Object.keys(query?.query)[0]].name}` : query.label,
        labelValue: query.label,
        [query?.query[Object.keys(query?.query)[0]]?.action]: dayjs(query?.query[Object.keys(query?.query)[0]]?.value),
        type: queryTupe,
        depth: dataDepth=== 1 || dataDepth=== 3 ? 1:2,
        isConnectionType: query.type === 'node' ? false : true,
        ref_property_type_id: query?.query[Object.keys(query?.query)[0]].type,
      };
    } else if (queryTupe === 'Range') {
      const value = query?.query[Object.keys(query?.query)[0]].value.split(',');
      return {
        ...query,
        id:dataID,
        name: dataDepth === 2 || dataDepth === 4 ? query?.query[Object.keys(query?.query)[0]].name : query.label,
        parent_id:dataParent_ID,
        labelName: dataDepth === 2 || dataDepth === 4 ? `${query.label}.${query?.query[Object.keys(query?.query)[0]].name}` : query.label,
        labelValue: query.label,
        typeText: [dayjs(value[0]), dayjs(value[1])],
        type: queryTupe,
        depth: dataDepth=== 1 || dataDepth=== 3 ? 1:2,
        isConnectionType: query.type === 'node' ? false : true,
        ref_property_type_id: query?.query[Object.keys(query?.query)[0]].type,
      };
    } else {
      return {
        ...query,
        id:dataID,
        name: dataDepth === 2 || dataDepth === 4 ? query?.query[Object.keys(query?.query)[0]].name : query.label,
        parent_id:dataParent_ID,
        labelName: dataDepth === 2 || dataDepth === 4 ? `${query.label}.${query?.query[Object.keys(query?.query)[0]].name}` : query.label,
        labelValue: query.label,
        type: queryTupe,
        value: query?.query[Object.keys(query?.query)[0]]?.value,
        depth: dataDepth=== 1 || dataDepth=== 3 ? 1:2,
        isConnectionType: query.type === 'node' ? false : true,
        ref_property_type_id: dataDepth === 2 ? query?.query[Object.keys(query?.query)[0]].type : '',
      };
    }
  });
  return FormData;
};

export const getQueryFilterType = (type: QueryFilterTypes): string => {
  switch (type) {
    case QueryFilterTypes.GREATHER_THAN:
      return '>';
    case QueryFilterTypes.LESS_THAN:
      return '<';
    case QueryFilterTypes.EQUAL_TO:
      return '=';
    case QueryFilterTypes.IS_NOT:
      return 'IS_NOT_VALUE';
    case QueryFilterTypes.IS:
      return 'IS_VALUE';
    case QueryFilterTypes.RANGE:
      return 'BETWEEN';
    case QueryFilterTypes.BETWEEN:
      return 'BETWEEN';
    case QueryFilterTypes.BEFORE:
      return '<';
    case QueryFilterTypes.AFTER:
      return '>';
    case QueryFilterTypes.IS_NULL:
      return 'IS_NULL';
    case QueryFilterTypes.IS_NOT_NULL:
      return 'IS_NOT_NULL';
    case QueryFilterTypes.CONTAINS:
      return 'CONTAINS';
    default:
      return '';
  }
};

export const getOptions = (
  depth: number,
  isConnection = false,
  isVisualisation = false,
  propertyType?: PropertyTypes,
  isMultiple?: boolean
) => {
  switch (true) {
    case (!isConnection && depth === 1) || (isConnection && (depth === 1 || depth === 2)):
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
    case propertyType === PropertyTypes.Integer || propertyType === PropertyTypes.Decimal: {
      const numberProperties = [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];

      if (isMultiple) return numberProperties;
      else
        return [
          ...numberProperties,
          { name: QueryFilterTypes.GREATHER_THAN, value: QueryFilterTypes.GREATHER_THAN },
          { name: QueryFilterTypes.LESS_THAN, value: QueryFilterTypes.LESS_THAN },
          { name: QueryFilterTypes.EQUAL_TO, value: QueryFilterTypes.EQUAL_TO },
          { name: QueryFilterTypes.BETWEEN, value: QueryFilterTypes.BETWEEN },
        ];
    }
    case propertyType === PropertyTypes.Date || propertyType === PropertyTypes.DateTime: {
      const dateProperties = [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
      if (isMultiple) return dateProperties;
      else
        return [
          ...dateProperties,
          { name: QueryFilterTypes.RANGE, value: QueryFilterTypes.RANGE },
          { name: QueryFilterTypes.BEFORE, value: QueryFilterTypes.BEFORE },
          { name: QueryFilterTypes.AFTER, value: QueryFilterTypes.AFTER },
        ];
    }
    case propertyType === PropertyTypes.Text && isVisualisation:
      return [
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.Text:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.Boolean:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
      ];
    case propertyType === PropertyTypes.URL:
    case propertyType === PropertyTypes.IMAGE_URL:
    case propertyType === PropertyTypes.Document:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
    case propertyType === PropertyTypes.Location:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.Connection:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
    case propertyType === PropertyTypes.RichText:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.ENUM:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
      ];
    default:
      return Object.values(QueryFilterTypes).map((item) => ({ name: item, value: item }));
  }
};

type Props = Partial<RefSelectProps> & {
  depth: number;
  isConnection: boolean;
  propertyType?: PropertyTypes;
  isVisualisation?: boolean;
  isMultiple: boolean;
  defaultValue?: string;
};

export const QueriesSelect = ({
  depth,
  isConnection,
  propertyType,
  isVisualisation = false,
  isMultiple,
  ...props
}: Props) => {
  const data = getOptions(depth, !!isConnection, isVisualisation, propertyType, isMultiple);
  return <Select style={{ width: '100%' }} placeholder="Please select" options={data} {...props} />;
};
