import { Flex } from 'antd';

import { ReactComponent as MaxIcon } from 'components/icons/maximum-operator.svg';
import { ReactComponent as MinIcon } from 'components/icons/minimum-operator.svg';
import { ReactComponent as CountIcon } from 'components/icons/count-operator.svg';
import { ReactComponent as AvgIcon } from 'components/icons/avg-operator.svg';
import { ReactComponent as SumIcon } from 'components/icons/sum-operator.svg';

import { AnalyticOpearators, AnalyticPropertyType } from 'helpers/constants';

const { COUNT, MAX, MIN, AVG, SUM, COUNT_DISTINCT } = AnalyticOpearators;
const { NAME, INTEGER, BOOLEAN, TEXT, ENUM, DATE, DATETIME, DECIMAL } = AnalyticPropertyType;

export const CHART_OPERATOR = [
  {
    label: (
      <Flex align="center" gap={16}>
        <MaxIcon />
        Max
      </Flex>
    ),
    value: MAX,
    type: [INTEGER, DECIMAL],
  },
  {
    label: (
      <Flex align="center" gap={16}>
        <MinIcon />
        Min
      </Flex>
    ),
    value: MIN,
    type: [INTEGER, DECIMAL],
  },
];

export const CARD_OPERATOR = [
  {
    label: (
      <Flex align="center" gap={16}>
        <CountIcon />
        Count Distinct
      </Flex>
    ),
    value: COUNT_DISTINCT,
    type: [NAME, TEXT, DATE, DATETIME, BOOLEAN, ENUM, DECIMAL, INTEGER],
  },
  {
    label: (
      <Flex align="center" gap={16}>
        <MaxIcon />
        First
      </Flex>
    ),
    value: MAX,
    type: [NAME, TEXT, BOOLEAN, DECIMAL, INTEGER, DATE, DATETIME],
  },
  {
    label: (
      <Flex align="center" gap={16}>
        <MaxIcon />
        Last
      </Flex>
    ),
    value: MIN,
    type: [NAME, TEXT, BOOLEAN, DECIMAL, INTEGER, DATE, DATETIME],
  },
];

export const OPERATOR_SELECT_OPTIONS = [
  {
    label: (
      <Flex align="center" gap={16}>
        <CountIcon />
        Count
      </Flex>
    ),
    value: COUNT,
    type: [NAME, TEXT, INTEGER, DATE, DATETIME, BOOLEAN, DECIMAL, ENUM],
  },
  {
    label: (
      <Flex align="center" gap={16}>
        <SumIcon />
        Sum
      </Flex>
    ),
    value: SUM,
    type: [INTEGER, DECIMAL],
  },
  {
    label: (
      <Flex align="center" gap={16}>
        <AvgIcon />
        Avg
      </Flex>
    ),
    value: AVG,
    type: [INTEGER, DECIMAL],
  },
];
