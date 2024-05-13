/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  await knex.schema.alterTable('jobs', (table) => {
	table.dropColumn('text')
    table.string('name')
    table.string('description')
    table.string('country')
    table.enu('status',['ACTIVE', 'ON HOLD', 'OUT', 'PLACEMENT'])
    table.enu('type',['FULL TIME', 'PART TIME', 'INTERNSHIP', 'CONTRACT'])
    table.enu('seniority',['JUNIOR', 'MID', 'SENIOR', 'EXECUTIVE', 'DIRECTOR'])
    table.string('area')
    table.string('industry')
    table.string('skills')
    table.datetime('date')
    table.string('currency')
    table.bigint('minAnualSalary')
    table.bigint('maxAnualSalary')
    table.string('benefit')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export  async function down (knex) {
  await knex.schema.alterTable('jobs', (table) => {
    table.dropColumns(
      'name',
      'description',
      'country',
      'status',
      'type',
      'seniority',
      'area',
      'industry',
      'skills',
      'date',
      'currency',
      'minAnualSalary',
      'maxAnualSalary',
      'benefit'
    )
  })
}
