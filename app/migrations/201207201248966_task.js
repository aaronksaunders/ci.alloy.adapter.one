migration.up = function(db) {
	db.createTable("task",
		{
		    "columns": {
		        "person": "string",
		        "description": "string"
		    },
		    "defaults": {},
		    "adapter": {
		        "type": "sql",
		        "tablename": "task"
		    }
		}
	);
};

migration.down = function(db) {
	db.dropTable("task");
};
