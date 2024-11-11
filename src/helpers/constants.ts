export const PATHS = {
  ROOT: '/',
  ROOT_AZURE: '/auth/saml-sso',
  UI: '/ui',
  SIGN_IN: '/sign-in',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ADMIN: '/admin',
  ADMIN_MANAGEMENT: 'admin/management',
  PROJECTS: '/projects',
  PROFILE: '/profile',
  PROJECT_OVERVIEW: '/projects/:id',
  PROJECT_UPDATE: '/projects/update/:id',
  PROJECT_CREATE: '/projects/create',
  PROJECT_SCHEME: '/projects/scheme/:id',
  PROJECT_TEMPLATE: '/projects/template/:id',
  PROJECT_TEMPLATE_EDIT: '/projects/templates-edit/:id',
  PROJECT_PERSPECTIVES: '/projects/perspectives/:id',
  PROJECT_VISUALISATION: '/projects/visualisation/:id',
  PROJECT_ANALYTICS: '/projects/analytics/:id',
  PROJECT_DOCUMENTS: '/projects/documents/:id',
  DATA_SHEET: '/projects/data-sheet/:id',
  NODE_OVERVIEW: '/projects/data-sheet/:id/:node_type_id',
  PUBLIC: '/public',
  TEMPLATES: '/templates',
  SHARED: '/shared',
  TEMPLATE: '/template',
  GROUPS: '/groups',
  GROUPS_PROJECTS: '/groups/projects/:id',
  FOLDER: '/folder/:id',
  ERROR_403: 'no-access',
  PUBLIC_PREFIX: '/public',
  ERROR_SERVER: '/error/server',
  ERROR_NOT_FOUND: '/error/not-found',
};

export const COLORS = {
  PRIMARY: {
    BLUE: '#232F6A',
    GRAY_DARK: '#414141',
    GRAY: '#808080',
    GRAY_LIGHT: '#DBDBDB',
    WHITE: '#FFFFFF',
    SILVER: '#BFBFBF',
    SILVER_LIGHT: '#E2E0E8',
  },
  ALERT: {
    RED: '#CF000F',
    GRAY: '#808080',
    GREEN: '#5ACA75',
  },
  SECONDARY: {
    BLUE: '#4D7EC7',
    BLUE_LIGHT: '#59CFDF',
    CYAN: '#4DC7B5',
    MAGENTA: '#F27281',
    MAGENTA_LIGHT: '#D789D9',
    YELLOW: '#F5B452',
    YELLOW_LIGHT: '#EDE06D',
    GRAY_LIGHT: '#8A91AE',
    MAXIMUM_BLUE: '#4DAAC7',
    GREEN: '#1F8F74',
    GREEN_LIGHT: '#89D9B3',
    BLUE_MEDIUM: '#7F6DED',
    LAVANDER: '#AC89D9',
    PURPLE_MIDDLE: '#D989AF',
    PEARL_AQUA: '#89D9C6',
    PASTEL_BLUE: '#B8D4D6',
    PURPLE_BLUE: '#A2ACDE',
    STEEL_BLUE: '#405D8B',
    AERO_BLUE: '#BBDACB',
    LAVANDER_DARKL: '#C7BDD4',
    PINK: '#DBAFA1',
    LIGHT_SILVER: '#C5C5C5',
  },
  JIRA: {
    GRAY: '#6F6F6F',
    BLUE: '#3C78F4',
    GREEN: '#4E9E6F',
  },
  ANALYTICS: {
    DEFAULT_GREY: '#414141',
    GREY_10: '#f6f6f6',
    GREY_20: '#808080',
  },
  MAIN_GRAY: '#F2F2F2',
  MAIN_GRAY_SILVER: '#c3c3c3',
  BLUE_10: '#232F6A',
};

export const AUTH_KEYS = {
  USER: 'araks-user',
  TOKEN: 'araks-token',
  REFRESH_TOKEN: 'araks-refresh-token',
};

export const VARIABLES = {
  MAX_PROJECT_TITLE_LENGTH: 15,
};

export const DEFAULT_ICON = 'araks-small';
export const DEFAULT_COLOR = COLORS.PRIMARY.GRAY_LIGHT;

export const screenSize = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xll: '1400px',
  xxl: '1600px',
};

export const VALIDATE_MESSAGES = {
  required: 'Required field',
};

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 1;

export const initPageData = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const centerImageStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const ORDER = { ASC: 'ASC', DESC: 'DESC' };

export const dateFormat = 'DD/MM/YYYY';

export enum ProjectPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum AnalyticTools {
  CHART = 'chart',
  TEXT = 'text',
  TABLE = 'table',
  CARD = 'card',
}

export enum AnalyticToolType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  TABLE = 'table',
  Editor = 'editor',
}

export enum AnalyticToolForm {
  TREESELECT = 'treeSelect',
  SELECT = 'select',
  INPUT = 'input',
  COLOR = 'color',
  TEXT_EDITOR = 'text-editor',
}

export enum AnalyticActionTypes {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE',
  TO_BE_CENTER = 'TO_BE_CENTER',
}

export enum AnalyticOpearators {
  COUNT = 'COUNT',
  SUM = 'SUM',
  MAX = 'MAX',
  AVG = 'AVG',
  MIN = 'MIN',
  FIRST = 'FIRST',
  LAST = 'LAST',
  COUNT_DISTINCT = 'COUNT_DISTINCT',
}

export enum AnalyticPropertyType {
  NAME = 'name',
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  BOOLEAN = 'boolean',
  ENUM = 'enum',
}

export const AnalyticToolsDisabled = {
  [AnalyticTools.CHART]: true,
  [AnalyticTools.TABLE]: true,
  [AnalyticTools.CARD]: true,
};

export const NODE_LIMIT = 500;

export const ROLE_OPTIONS = [
  {
    label: 'Can Edit',
    value: 'edit',
  },
  {
    label: 'Can View',
    value: 'view',
  },
];

export const pathMap = {
  [PATHS.PUBLIC]: PATHS.PUBLIC,
  [PATHS.SHARED]: PATHS.SHARED,
  [PATHS.TEMPLATE]: PATHS.TEMPLATE,
  [PATHS.PROJECTS]: PATHS.PROJECTS,
  [PATHS.GROUPS]: PATHS.GROUPS,
};

export const ANALYTICS = {
  CANVAS: {
    MAX_WIDTH: window.innerWidth - 600,
    MAX_HEIGHT: 740,
  },
  TOOLBAR: {
    WIDTH: 370,
  },
  BARTYPES: {
    WIDTH: 270,
  },
  COLOR_INTERVAL: 10,
  AXIS_SIZE: 35,
  LEGEND_TOOL_WIDTH: 200,
  ANALYTIC_TABLE_PAGE_SIZE: 20,
};

export const patterns = {
  datePattern:
    '^(?:(?:\\d{4}(\\/|-|\\.)(?:0?[1-9]|1[0-2])\\1(?:0?[1-9]|[12]\\d|3[01])))$|^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\2|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\3))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\4(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\5(?:(?:1[6-9]|[2-9]\\d)?\\d{2})(?:\\s([01]?\\d|2[0-3]):([0-5]?\\d):([0-5]?\\d))?$',
  booleanPattern: /^(yes|no|true|false|1|0|on|off)$/i,
  decimalPattern: /^-?\d*\.\d+$/,
  integerPattern: /^-?\d+$/,
};

export const KEYWORDS: string[] = [
  '_id',
  'id',
  'default_image',
  'project_id',
  'user_id',
  'project_type_id',
  'project_type_parent_id',
  'created_at',
  'updated_at',
  'color',
  'edge_source_id',
  'edge_target_id',
  'inverse',
  'multiple',
  'project_edge_type_id',
  'source_color',
  'source_id',
  'source_name',
  'target_color',
  'target_id',
  'target_name',
  'match',
  'return',
  'create',
  'set',
  'tofloat',
  'tointeger',
  'distinct',
  'delete',
  'remove',
  'detach',
  'unwind',
  'prop',
  'props',
  'uprop',
  'key',
  'value',
  'keys',
  'values',
  'apoc',
  'shortestPath',
  'relation',
  'relations',
  'relationship',
  'relationships',
  'node',
  'nodes',
  'edge',
  'edges',
  'and',
  'or',
  'as',
  'collect',
  'type',
  'types',
  'where',
  'call',
  'path',
  'label',
  'properties',
  'property',
  'with',
  'limit',
  'skip',
  'offset',
  'index',
  'labels',
  'tolower',
  'tostring',
  'split',
  'allshortestPaths',
  'db.schema',
  'union',
  'merge',
  'optional',
  'case',
  'count',
  'order',
  'by',
  'asc',
  'in',
  'desc',
  'foreach',
  'drop',
  'exist',
  'start,',
  'and',
  'exists',
  'exit',
  'size',
  'substring',
  'replace',
  'coalesce',
  'filter',
  'extract',
  'reduce',
  'when',
  'load',
  'json',
  'expand',
  'schema',
  'database',
  'join',
  'text',
  'parse',
  'math',
  'constraint',
  'load',
  'layer',
  'in_layer',
];

export const regexPattern = /^[ ~`!@#$%^&*()_\-+=\{\}\[\]|\\:;"“”‘’,.\/<>?]$/;

export const optionsRegex = [
  { label: 'None', value: 'None' },
  { label: 'Semicolon', value: 'Semicolon' },
  { label: 'Comma', value: 'Comma' },
  { label: 'Space', value: 'Space' },
  { label: 'Other', value: 'Other' },
];

export const analyticsPagesPath = /\/projects\/analytics\/[^/]+/;
