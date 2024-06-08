/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fo10u26aylcfo7i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqgwmdyr",
    "name": "login_timestamp",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pql1r58k",
    "name": "logout_timestamp",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fo10u26aylcfo7i")

  // remove
  collection.schema.removeField("xqgwmdyr")

  // remove
  collection.schema.removeField("pql1r58k")

  return dao.saveCollection(collection)
})
