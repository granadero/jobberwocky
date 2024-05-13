/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('subscription', (table) => {
    table.dropColumn('text')
    table.string('name')
    table.string('email')
    table.string('seniority')
    table.string('area')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('subscription', (table) => {
    table.dropColumns('name', 'email', 'seniority', 'area')
  })
}
