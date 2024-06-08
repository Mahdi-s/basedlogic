/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "58y46kx3s3fe3e0",
    "created": "2024-06-08 02:19:35.512Z",
    "updated": "2024-06-08 02:19:35.512Z",
    "name": "sentences",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q5hdz3p5",
        "name": "sentence",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "dldzihn3",
        "name": "topic",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jxfup4py",
        "name": "political_affiliation",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("58y46kx3s3fe3e0");

  return dao.deleteCollection(collection);
})
