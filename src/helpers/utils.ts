import { AUTH_KEYS, DEFAULT_ICON, KEYWORDS, patterns } from './constants';
import { iconsList } from 'components/icon';
import { AxiosError } from 'axios';
import { Modal } from 'antd';
import { CustomError, NodeEdgeTypesReturnData, ProjectTreeReturnData } from 'api/types';
import { PropertyTypes } from 'components/form/property/types';
import dayjs, { Dayjs } from 'dayjs';
import { TreeNodeType } from '../pages/data-sheet/types';
import { DefaultOptionType } from 'antd/es/cascader';
import { QueryFilterTypes } from '../components/select/queries-select';
import { getDate } from '../components/button/queries-button';
import { IEnumProperty } from 'types/project-node-types-property';

/** Checks if icon exists in our list */
export const checkIconInList = (iconName: string) => iconsList.includes(iconName);

export const getIconName = (iconName: string) => (checkIconInList(iconName) ? iconName : DEFAULT_ICON);

/** Get logged in user data from local storage */
export const logedInUser = localStorage.getItem(AUTH_KEYS.USER)
  ? JSON.parse(localStorage.getItem(AUTH_KEYS.USER) || '')
  : null;

export const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const errorMessage = (er: unknown) => {
  Modal.error({
    title: 'Error',
    content: (er as AxiosError<CustomError>).response?.data.errors.message || 'Something happened, please try later',
    footer: false,
    closable: true,
  });
};

export const convertByType = (value: unknown[], type: PropertyTypes, addFromatForDate = false) => {
  switch (type) {
    case PropertyTypes.DateTime:
      if (!value || !(value as unknown[]).filter(Boolean).length) {
        return '';
      }
      if (addFromatForDate) {
        return dayjs(value[0] as string).format('DD/MM/YYYY HH:mm');
      }
      return dayjs(value[0] as string);
    case PropertyTypes.Date:
      if (!value || !(value as unknown[]).filter(Boolean).length) {
        return '';
      }
      if (addFromatForDate) {
        return dayjs(value[0] as string).format('DD/MM/YYYY');
      }
      return dayjs(value[0] as string);
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
    default:
      return value[0];
  }
};

function getColumnLetter(columnNumber: number): string {
  let columnLetter = '';

  while (columnNumber > 0) {
    const remainder = (columnNumber - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }

  return columnLetter;
}

export function getExcelColumnNames(startColumn: number, endColumn: number): string[] {
  const columnNames: string[] = [];

  for (let i = startColumn; i <= endColumn; i++) {
    const columnName = getColumnLetter(i);
    columnNames.push(columnName);
  }

  return columnNames;
}

export function detectType(value: string | null): PropertyTypes {
  if (value === null || value === undefined) {
    return PropertyTypes.Text;
  }

  value = value.toString();

  if (value === '') return PropertyTypes.Text;

  const datePattern = new RegExp(patterns.datePattern);

  if (datePattern.test(value)) {
    return PropertyTypes.Date;
  }

  const booleanRegex = patterns.booleanPattern;

  if (booleanRegex.test(value)) {
    return PropertyTypes.Boolean;
  }

  try {
    new URL(value);
    return PropertyTypes.URL;
  } catch (_) {}

  const decimalPattern = patterns.decimalPattern;
  const integerPattern = patterns.integerPattern;

  if (decimalPattern.test(value)) {
    return PropertyTypes.Decimal;
  }

  if (integerPattern.test(value)) {
    return PropertyTypes.Integer;
  }

  return PropertyTypes.Text;
}

export const validationPropertyName = (name: string) => {
  name = name.trim();

  if (name.length < 3 && name.length > 0) {
    name = 'field_' + name;
  }

  name = name.replace(/\s+/g, '_');

  name = name.toLowerCase();

  name = name.replace(/^\d+/, 'field_');

  name = name.replace(/[^a-z0-9_]/g, '');

  if (KEYWORDS.includes(name)) {
    name = `field_${name}`;
  }

  return name;
};

export function formatTimeDifference(likedTime: string) {
  const currentTime = dayjs();
  const timeDifference = currentTime.diff(likedTime, 'second');

  if (timeDifference < 60) {
    return 'just now';
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minutes ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hours ago`;
  } else if (timeDifference < 604800) {
    // 7 days (1 week)
    const days = Math.floor(timeDifference / 86400);
    return `${days} days ago`;
  } else if (timeDifference < 2592000) {
    // 30 days
    const weeks = Math.floor(timeDifference / 604800);
    return `${weeks} weeks ago`;
  } else if (timeDifference < 31536000) {
    // 365 days
    const months = Math.floor(timeDifference / 2592000);
    return `${months} months ago`;
  } else {
    const years = Math.floor(timeDifference / 31536000);
    return `${years} years ago`;
  }
}

export const updateTypeParentId = (types: ProjectTreeReturnData[] | undefined) => {
  types?.forEach((t) => {
    if (!types?.some((n) => n.id === t.parent_id)) {
      t.parent_id = null;
    }
  });
};

export type ItemType =
  | TreeNodeType
  | (NodeEdgeTypesReturnData & DefaultOptionType & { type: QueryFilterTypes; typeText: string });

export const getQueryValue = (item: ItemType) => {
  const { type, betweenStart, betweenEnd, typeText, ref_property_type_id, enums_data } = item;

  if (ref_property_type_id === PropertyTypes.ENUM) {
    if (!typeText) return undefined;

    const data =
      typeof typeText === 'string'
        ? enums_data.find((e: IEnumProperty) => e.id === typeText).name
        : typeText.map((e: string) => enums_data.find((enumData: IEnumProperty) => enumData.id === e).name).toString();

    return data;
  }

  const isBeforeAfter = (item: ItemType) => {
    return [QueryFilterTypes.BEFORE, QueryFilterTypes.AFTER].includes(item.type);
  };

  const isBetween = (item: ItemType) => {
    return item.type === QueryFilterTypes.BETWEEN;
  };

  const isDateOrTime = (item: ItemType) => {
    return [PropertyTypes.Date, PropertyTypes.DateTime].includes(item.ref_property_type_id);
  };

  if (isBeforeAfter(item)) {
    const date = item[type === QueryFilterTypes.BEFORE ? '<' : '>'];

    return item.ref_property_type_id === PropertyTypes.Date ? getDate(date).toString() : date.toISOString();
  }

  if (isBetween(item)) {
    return [betweenStart, betweenEnd].toString();
  }

  if (isDateOrTime(item)) {
    if (!typeText) return undefined;

    const convertToDateString = (date: Dayjs) => {
      return item.ref_property_type_id === PropertyTypes.Date ? getDate(date).toString() : date.toISOString();
    };

    const typeTextArray = Array.isArray(typeText) ? typeText : [typeText];

    // Range type need to be the format - 2023-11-10,2023-11-20
    return typeTextArray.map(convertToDateString).join(',');
  }

  return typeText?.toString() || '';
};
export const getAvatarPath = (avatar: string | undefined) =>
  avatar ? (avatar?.includes('gravatar') ? avatar : `${process.env.REACT_APP_AWS_URL}${avatar}`) : undefined;

export const formatDateToCustom = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // return example 2024.02.07 17:07
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const getYearsArrFrom = ({ from, to }: { from: number; to: number | undefined }) => {
  const currentYear = to !== undefined && to <= from ? to : new Date().getFullYear();
  const yearArray = [];
  for (let year = from; year <= currentYear; year++) {
    yearArray.push(year);
  }
  return yearArray;
};

export function removeSymbols({
  input,
  caseType="allUppercase",
}: {
  input: string;
  caseType: 'allUppercase' | 'allLowercase' | 'onlyFirstUppercase';
}) {
  const processedString = input.replace(/[^a-zA-Z]/g, ' ');
  processedString.replace(/\s+/g, ' ').trim();
  switch (caseType) {
    case 'allUppercase':
      return processedString.toUpperCase();
    case 'allLowercase':
      return processedString.toLowerCase();
    case 'onlyFirstUppercase':
      return processedString.toLowerCase().replace(/^\w|\s\w/g, (letter) => letter.toUpperCase()); // Capitalize the first letter of each word
    default:
      return processedString;
  }
}
 export const extractTextFromHTML = (htmlString: string) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;
  return Array.from(tempElement.getElementsByTagName('p'))
    .map((p) => p.textContent)
    .join(' ');
};
