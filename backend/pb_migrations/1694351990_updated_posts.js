/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d59rtfvp1dr6qgc")

  // remove
  collection.schema.removeField("ggqy0uab")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d59rtfvp1dr6qgc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggqy0uab",
    "name": "tags",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
