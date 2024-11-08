import { useMemo } from 'react';
import { MatchProperty } from 'api/visualisation/use-create-fuzzy-match';

type EdgeSelectedProperties = { id?: string; name?: string; type?: string }[];

export const useConnectionOptions = (
  sourceProperties: MatchProperty[],
  targetProperties: MatchProperty[],
  selectedSourceProperties: EdgeSelectedProperties,
  selectedTargetProperties: EdgeSelectedProperties
) => {
  return useMemo(() => {
    return sourceProperties.map(({ id, name, fuzzy_match, exact }, i) => {
      const source = {
        id,
        value: name,
        type: selectedSourceProperties[i]?.type,
        name: selectedSourceProperties[i]?.name,
      };

      const target = {
        id: targetProperties[i].id,
        value: targetProperties[i].name,
        type: selectedTargetProperties[i]?.type,
        name: selectedTargetProperties[i]?.name,
      };

      const property_info = {
        text: exact ? 'Exact' : `Fuzzy Match: ${fuzzy_match}%`,
      };

      return {
        source,
        target,
        property_info,
      };
    });
  }, [selectedSourceProperties, selectedTargetProperties, sourceProperties, targetProperties]);
};
