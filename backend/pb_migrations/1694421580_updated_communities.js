/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uvvar18dpz6vchf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jzn1z9ot",
    "name": "introduction",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 500,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uvvar18dpz6vchf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jzn1z9ot",
    "name": "introduction",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
