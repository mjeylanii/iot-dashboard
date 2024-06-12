/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '6o0ml0hk',
				name: 'bookmarkedTask',
				type: 'relation',
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'hgqz67aldv7gtxm',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: null,
					displayFields: null,
				},
			}),
		);

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'vp970xra',
				name: 'tasks',
				type: 'relation',
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'hgqz67aldv7gtxm',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: null,
					displayFields: null,
				},
			}),
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

		// remove
		collection.schema.removeField('6o0ml0hk');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'vp970xra',
				name: 'tasks',
				type: 'relation',
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'hgqz67aldv7gtxm',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: 1,
					displayFields: null,
				},
			}),
		);

		return dao.saveCollection(collection);
	},
);
