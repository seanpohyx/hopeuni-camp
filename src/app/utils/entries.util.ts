import { IndexedObject } from '../model/IndexedObject.model';

export function ExtractTopK(
			entries: string[], k: number = 0, 
			fromSheet: (string) => IndexedObject): IndexedObject[] {

	const latestEntries = [];
    for (let i = entries.length - 1; i > 0; i--) {
      const entry = fromSheet(entries[i]);
      if (latestEntries[entry.getId()] == null) {
        latestEntries[entry.getId()] = entry
      }
    }

    return latestEntries
		    .filter(entry => entry != null && !entry.isDeleted())
		    .slice(-k)
		    .reverse();
}