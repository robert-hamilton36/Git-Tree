
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

interface UserData {
  login: string;
  avatar_url: string;
}

type Messages = IFetchMessage | ILoginMessage | ILogoutMessage | ICheckUserMessage

interface IFetchMessage {
  type: 'fetchBranch' | 'fetchTree';
  url: string;
}

interface ILoginMessage {
  type: 'login'
}

interface ILogoutMessage {
  type: 'logout'
}

interface ICheckUserMessage {
  type: 'currentUser'
}

interface IReturnUserMessage {
  type: 'user';
  data: UserData;
}

interface IReturnBranchMessage {
  type: 'branch';
  data: string;
}

interface IReturnTreeMessage {
  type: 'tree';
  data: TreeAPI[];
}

interface IErrorMessage {
  type: 'error';
  error: string;
}

interface ReactChildren {
  children: React.ReactNode;
} 

type PageView = 'tree' | 'user'