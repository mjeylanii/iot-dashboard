const createImageUrl = (record: any, filename: string) => {
	return (
		`http://${db_config.host}:${db_config.port}/api/files/personnel/` + record.id + '/' + filename
	);
};
