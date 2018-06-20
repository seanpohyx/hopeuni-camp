import { IndexedObject } from "./IndexedObject.model";

export class AnnouncementEntry extends IndexedObject{
	private description: string;

	constructor(id: number, description: string, deleted?:number) {
		if (deleted == null) {
			deleted = 0;
		}
		super(id, deleted);
		this.description = description;
	}

	static FromSheet(values: any[]): AnnouncementEntry {
		const annoEntry = new AnnouncementEntry(0, "", 1);
		annoEntry.setId(values[0]);
		annoEntry.setDeleted(values[1]);
		annoEntry.setDescription(values[2]);
		return annoEntry;
	}

	getDescription(): string {
		return this.description;
	}

	setDescription(description: string): void {
		this.description = description;
	}

	toSheet(): any[] {
		return [this.getId(), this.getDeleted(), this.description];
	}
}