export class IndexedObject {
	private id: number;
	private deleted: number;

	constructor(id: number, deleted: number) {
		this.id = id;
		this.deleted = deleted;
	}

	isDeleted(): boolean {
		return this.deleted === 1;
	}

	delete(): void {
		this.setDeleted(1);
	}

	getId(): number {
		return this.id;
	}

	setId(id: number): void {
		this.id = +id;
	}

	getDeleted(): number {
		return this.deleted;
	}
	
	setDeleted(deleted: number): void {
		this.deleted = +deleted;
	}
}