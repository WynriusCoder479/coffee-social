/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uvvar18dpz6vchf",
    "created": "2023-09-07 12:29:02.311Z",
    "updated": "2023-09-07 12:29:02.311Z",
    "name": "communities",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8tv5j0uh",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "f21xiict",
        "name": "avatar",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/vnd.mozilla.apng",
            "image/jpeg",
            "image/jpm",
            "image/webp",
            "image/bmp",
            "image/tiff",
            "image/svg+xml"
          ],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "zxojq4sk",
        "name": "cover",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/vnd.mozilla.apng",
            "image/jpeg",
            "image/jpm",
            "image/webp",
            "image/tiff",
            "image/bmp",
            "image/svg+xml"
          ],
          "thumbs": [],
          "protected": false
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "07n1xse2",
        "name": "creator",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "fsfd6u1u",
        "name": "subscribers",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uvvar18dpz6vchf");

  return dao.deleteCollection(collection);
})
