/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fo10u26aylcfo7i",
    "created": "2024-06-08 02:06:43.331Z",
    "updated": "2024-06-08 02:06:43.331Z",
    "name": "user_sessions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fksb8enb",
        "name": "user_id",
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
  const collection = dao.findCollectionByNameOrId("fo10u26aylcfo7i");

  return dao.deleteCollection(collection);
})
