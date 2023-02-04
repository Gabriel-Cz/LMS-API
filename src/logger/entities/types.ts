export enum AuditAction {
  SIGN_UP = 'Sign Up',
  LOGIN = 'Login',
  CREATE = 'Create',
  LIST = 'List',
  READ = 'Read',
  UPDATE = 'Update',
  DELETE = 'Delete',
  UNTRACKED = 'Untracked',
}

export enum AuditResource {
  AUTH = 'Auth',
  USERS = 'Users',
  LECTURES = 'Lectures',
  TESTS = 'Tests',
}
