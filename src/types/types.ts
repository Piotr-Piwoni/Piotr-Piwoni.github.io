export interface ProjectMetadata {
	name: string;
	short: string;
	long?: string;
	tags: string[];
	cover: string;
	page: string;
	folder: string;
}

export interface TagCategories {
	[category: string]: string[];
}