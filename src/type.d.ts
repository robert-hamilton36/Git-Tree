
//             file blob | exe blob |subdir(tree)| commit |symlink blob    
type FileMode = '100644' | '100755' | '040000' | '160000' | '120000'

type FileType = 'blob' | 'tree' | 'commit'


interface TreeAPI {
  mode: FileMode;
  path: string;
  sha: string | null;
  type: FileType;
  size?: number;
  url: string;
}

interface IMessage {
  type: 'fetch';
  url: string
}

interface ReactChildren {
  children: React.ReactNode
} 