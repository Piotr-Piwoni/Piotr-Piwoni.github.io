export interface ProjectMetadata {
	name: string;
	short: string;
	tags: string[];
	cover: string;
	outLinks: OutLink[];
	additionalAssets: string[];
	downloadFiles: string[];
	page: string;
	folder: string;
}

export interface TagCategories {
	[category: string]: string[];
}

export interface OutLink {
	name: string;
	url: string;
}
