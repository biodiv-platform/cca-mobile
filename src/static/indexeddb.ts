export const IDB_TABLES = {
  TEMPLATES: "templates",
  DATA: "data",
  PENDING: "pending"
};

const templateKeys = [
  "id",
  "createdOn",
  "description",
  "fields",
  "language",
  "name",
  "platform",
  "permissions",
  "shortName",
  "updatedOn",
  "userId"
];

const dataKeys = [
  "id",
  "ccaFieldValues",
  "centroid",
  "createdOn",
  "shortName",
  "updatedOn",
  "userId"
];

export const IDB_CONFIG = {
  databaseName: "cca-db",
  version: 1,
  stores: [
    {
      name: IDB_TABLES.TEMPLATES,
      id: { keyPath: "shortName" },
      indices: templateKeys.map((k) => ({ name: k, keyPath: k }))
    },
    {
      name: IDB_TABLES.PENDING,
      id: { keyPath: "id" },
      indices: dataKeys.map((k) => ({ name: k, keyPath: k }))
    },
    {
      name: IDB_TABLES.DATA,
      id: { keyPath: "id" },
      indices: dataKeys.map((k) => ({ name: k, keyPath: k }))
    }
  ]
};
