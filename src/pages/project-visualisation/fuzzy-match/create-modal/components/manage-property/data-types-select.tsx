import { PropertyTypes } from 'components/form/property/types';

export const editFuzzyPropertyList = {
  [PropertyTypes.Text]: [
    PropertyTypes.Text,
    PropertyTypes.Date,
    PropertyTypes.DateTime,
    PropertyTypes.Integer,
    PropertyTypes.Decimal,
    PropertyTypes.Location,
    PropertyTypes.ENUM,
  ],
  [PropertyTypes.Date]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.DateTime]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.Integer]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer, PropertyTypes.ENUM],
  [PropertyTypes.Decimal]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer, PropertyTypes.ENUM],
  [PropertyTypes.Location]: [PropertyTypes.Text, PropertyTypes.Location],
  [PropertyTypes.ENUM]: [PropertyTypes.ENUM, PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer],

  [PropertyTypes.URL]: [],
  [PropertyTypes.Boolean]: [],
  [PropertyTypes.Connection]: [],
  [PropertyTypes.IMAGE_URL]: [],
  [PropertyTypes.Document]: [],
  [PropertyTypes.RichText]: [],
};
