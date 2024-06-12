/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: 'hgqz67aldv7gtxm',
			created: '2024-05-15 14:43:02.201Z',
			updated: '2024-05-15 14:43:02.201Z',
			name: 'tasks',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'htsvcquz',
					name: 'title',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: '',
					},
				},
				{
					system: false,
					id: 'wmmej3dp',
					name: 'description',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: '',
					},
				},
				{
					system: false,
					id: 'vsvwxjwe',
					name: 'tags',
					type: 'json',
					required: false,
					presentable: false,
					unique: false,
					options: {
						maxSize: 2000000,
					},
				},
				{
					system: false,
					id: 'lhdgkqs9',
					name: 'status',
					type: 'select',
					required: false,
					presentable: false,
					unique: false,
					options: {
						maxSelect: 2,
						values: ['INACTIVE', 'ASSIGNED', 'DONE'],
					},
				},
				{
					system: false,
					id: '5fhgfcel',
					name: 'assignedTo',
					type: 'relation',
					required: false,
					presentable: false,
					unique: false,
					options: {
						collectionId: '_pb_users_auth_',
						cascadeDelete: false,
						minSelect: null,
						maxSelect: null,
						displayFields: null,
					},
				},
				{
					system: false,
					id: '1nwmhnnh',
					name: 'dueDate',
					type: 'date',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: '',
						max: '',
					},
				},
			],
			indexes: [],
			listRule: null,
			viewRule: null,
			createRule: null,
			updateRule: null,
			deleteRule: null,
			options: {},
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hgqz67aldv7gtxm');

		return dao.deleteCollection(collection);
	},
);
