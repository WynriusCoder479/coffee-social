/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uvvar18dpz6vchf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqq4m0lw",
    "name": "tags",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uvvar18dpz6vchf")

  // remove
  collection.schema.removeField("jqq4m0lw")

  return dao.saveCollection(collection)
})
