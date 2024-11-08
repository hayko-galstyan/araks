import { FuzzyMatchRequest } from '../../create-modal/components/form-data/fuzzy-form';
import { MatchData } from '../../create-modal/type';

type ValidateFormItems = (fields: FuzzyMatchRequest | undefined) => boolean;

/**
 *  // Return true if any element is undefined/null or empty
 *  // Return false if all elements are defined and not empty
 * @param fields
 */
export const validateFormItems: ValidateFormItems = (fields) => {
  if (!fields || checkRepetitiveItems(fields)) return true;

  const isNullOrWhiteSpace = (value: string | undefined | null): boolean => {
    return value === undefined || value === null || value.trim() === '';
  };

  if (
    isNullOrWhiteSpace(fields.edgeId) ||
    isNullOrWhiteSpace(fields.sourceId) ||
    isNullOrWhiteSpace(fields.targetId) ||
    fields.matchList.some(
      (matchItem) =>
        (!matchItem?.exact ? !matchItem?.fuzzyMatch : false) ||
        isNullOrWhiteSpace(matchItem?.sourceId) ||
        isNullOrWhiteSpace(matchItem?.targetId)
    )
  ) {
    return true;
  }

  return false;
};

type CheckRepetitiveItems = (fields: FuzzyMatchRequest) => boolean;

const checkRepetitiveItems: CheckRepetitiveItems = (fields) => {
  const matchList = fields.matchList as MatchData[];

  const checkDuplicates = (item: MatchData, index: number) =>
    matchList.findIndex((m, i) => i !== index && m?.sourceId === item?.sourceId && m?.targetId === item?.targetId) !==
    -1;

  return matchList?.some(checkDuplicates);
};
