import type { Context, NextFn } from '@warp-drive/core/request';
import type { StructuredDataDocument } from '@warp-drive/core/types/request';

export default class OriginPrivateFileSystemHandler {
  async getOrCreateFileHandle(
    urlPath: string,
    handle: FileSystemDirectoryHandle,
  ): Promise<FileSystemFileHandle> {
    const directories = urlPath.split('/');

    if (directories.length > 1) {
      const currentDirectoryHandle = await handle.getDirectoryHandle(
        directories.shift() as string,
        { create: true },
      );
      return await this.getOrCreateFileHandle(
        directories.join('/'),
        currentDirectoryHandle,
      );
    } else {
      const filename = directories[0] as string;
      return await handle.getFileHandle(filename, {
        create: true,
      });
    }
  }

  async request<T>(
    context: Context,
    next: NextFn<T>,
  ): Promise<T | StructuredDataDocument<T>> {
    if (!context.request.url) throw new Error('Needs to provide URL!');

    const rootOpfsHandler = await navigator.storage.getDirectory();

    // For testing purposes for now - if we need to clear OPFS
    // for await (const entry of rootOpfsHandler.entries()) {
    //   await rootOpfsHandler.removeEntry(entry[0], { recursive: true });
    // }

    const fileHandle = await this.getOrCreateFileHandle(
      context.request.url.substring(1), // Remove leading slash
      rootOpfsHandler,
    );

    const file = await fileHandle.getFile();
    let json: T;
    if (file.size === 0) {
      console.log('writing the file to the system!');
      // Did not exist before, pass over to fetch
      const dataDocument = await next(context.request);
      json = dataDocument.content;
      const writeable = await fileHandle.createWritable();
      await writeable.write(JSON.stringify(json));
      await writeable.close();
    } else {
      console.log('reading the file from the system!');
      const rawText = await file.text();
      json = JSON.parse(rawText) as T;
    }
    return json;
  }
}
