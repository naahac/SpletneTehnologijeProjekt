
exports.up = function(knex, Promise) {
  return knex.schema.createTable('picture', (table) => {
      table.increments('pictureId').primary();
      table.string('picture');
      table.integer('listingId')
          .references('listingId').inTable('listing');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('picture');
};
