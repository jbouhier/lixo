/**
 * Returns the index of the first available table in the array, else -1
 */
export const findAvailableTable = (tables: boolean[]): number =>
  tables.findIndex(e => e === true)
